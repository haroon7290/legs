/* Legs Night theme — vanilla JS, no dependencies.
 * Works against Shopify's AJAX Cart API. When window.LegsNightTheme.preview is true
 * (the static /preview pages) a localStorage cart is used instead. */
(function () {
  'use strict';

  var Theme = window.LegsNightTheme = window.LegsNightTheme || {};
  var routes = Theme.routes || { cart_add_url: '/cart/add', cart_change_url: '/cart/change', cart_url: '/cart' };
  var strings = Theme.strings || {};

  /* ---------------------------------------------------------------- money */
  function formatMoney(cents, format) {
    if (typeof cents === 'string') cents = cents.replace('.', '');
    format = format || Theme.moneyFormat || '${{amount}}';
    function withDelimiters(number, precision, thousands, decimal) {
      precision = precision == null ? 2 : precision;
      thousands = thousands || ',';
      decimal = decimal || '.';
      if (isNaN(number) || number == null) return 0;
      number = (number / 100.0).toFixed(precision);
      var parts = number.split('.');
      var dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      return dollars + (parts[1] ? decimal + parts[1] : '');
    }
    var match = format.match(/\{\{\s*(\w+)\s*\}\}/);
    if (!match) return format;
    var value;
    switch (match[1]) {
      case 'amount_no_decimals': value = withDelimiters(cents, 0); break;
      case 'amount_with_comma_separator': value = withDelimiters(cents, 2, '.', ','); break;
      case 'amount_no_decimals_with_comma_separator': value = withDelimiters(cents, 0, '.', ','); break;
      default: value = withDelimiters(cents, 2);
    }
    return format.replace(/\{\{\s*\w+\s*\}\}/, value);
  }
  Theme.formatMoney = formatMoney;

  function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* --------------------------------------------------------- cart backend */
  var PreviewCart = {
    key: 'legsnight-preview-cart',
    read: function () {
      try { return JSON.parse(localStorage.getItem(this.key)) || []; } catch (e) { return []; }
    },
    write: function (items) {
      try { localStorage.setItem(this.key, JSON.stringify(items)); } catch (e) { /* ignore */ }
      this.memory = items;
    },
    items: function () { return this.memory || (this.memory = this.read()); },
    toCart: function () {
      var items = this.items();
      var total = 0, original = 0, count = 0;
      items.forEach(function (i) {
        i.final_line_price = i.price * i.quantity;
        i.original_line_price = (i.compare_at_price || i.price) * i.quantity;
        i.line_level_discount_allocations = [];
      });
      if (Theme.previewPricing) Theme.previewPricing(items);
      items.forEach(function (i) {
        total += i.final_line_price; original += i.original_line_price; count += i.quantity;
      });
      return Promise.resolve({ items: items, item_count: count, total_price: total, original_total_price: original, total_discount: original - total });
    },
    add: function (data) {
      var catalog = Theme.previewCatalog || {};
      var items = this.items();
      data.items.forEach(function (line) {
        var v = catalog[line.id];
        if (!v) return;
        var existing = items.filter(function (i) { return i.id == line.id; })[0];
        if (existing) existing.quantity += line.quantity;
        else items.push(Object.assign({ key: String(line.id), id: line.id, quantity: line.quantity }, v));
      });
      this.write(items);
      return Promise.resolve();
    },
    change: function (key, quantity) {
      var items = this.items().filter(function (i) { if (i.key === key) i.quantity = quantity; return i.quantity > 0; });
      this.write(items);
      return this.toCart();
    }
  };

  var Cart = {
    get: function () {
      if (Theme.preview) return PreviewCart.toCart();
      return fetch(routes.cart_url + '.js', { headers: { Accept: 'application/json' } }).then(function (r) { return r.json(); });
    },
    add: function (items) {
      if (Theme.preview) return PreviewCart.add({ items: items });
      return fetch(routes.cart_add_url + '.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items: items })
      }).then(function (r) {
        return r.json().then(function (json) {
          if (!r.ok || json.status) throw new Error(json.description || json.message || strings.cartError || 'Error');
          return json;
        });
      });
    },
    change: function (key, quantity) {
      if (Theme.preview) return PreviewCart.change(key, quantity);
      return fetch(routes.cart_change_url + '.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: key, quantity: quantity })
      }).then(function (r) { return r.json(); });
    }
  };
  Theme.Cart = Cart;

  /* -------------------------------------------------------------- drawers */
  var openDrawer = null;
  function openDrawerEl(drawer) {
    if (!drawer) return;
    closeDrawer();
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    openDrawer = drawer;
    var focusTarget = drawer.querySelector('[data-drawer-close]');
    if (focusTarget) setTimeout(function () { focusTarget.focus(); }, 50);
  }
  function closeDrawer() {
    if (!openDrawer) return;
    openDrawer.classList.remove('is-open');
    openDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    openDrawer = null;
  }
  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-drawer-open]');
    if (opener) {
      var id = opener.getAttribute('data-drawer-open');
      if (id === 'cart-drawer' && !document.getElementById('cart-drawer')) return; // let link go to /cart
      e.preventDefault();
      openDrawerEl(document.getElementById(id));
      if (id === 'cart-drawer') refreshCart();
      return;
    }
    if (e.target.closest('[data-drawer-close]')) { e.preventDefault(); closeDrawer(); closeModal(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDrawer(); closeModal(); } });

  /* ---------------------------------------------------------------- modal */
  var openModalEl = null;
  function closeModal() { if (openModalEl) { openModalEl.classList.remove('is-open'); document.body.classList.remove('no-scroll'); openModalEl = null; } }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-modal-open]');
    if (!t) return;
    e.preventDefault();
    var m = document.getElementById(t.getAttribute('data-modal-open'));
    if (m) { m.classList.add('is-open'); document.body.classList.add('no-scroll'); openModalEl = m; }
  });

  /* ----------------------------------------------------------- cart drawer */
  function renderCart(cart) {
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      if (String(el.textContent).trim() !== String(cart.item_count) && cart.item_count > 0) {
        el.classList.remove('is-bumped'); void el.offsetWidth; el.classList.add('is-bumped');
      }
      el.textContent = cart.item_count;
      el.hidden = cart.item_count === 0;
    });
    var drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    var body = drawer.querySelector('[data-cart-body]');
    var footer = drawer.querySelector('[data-cart-footer]');
    var threshold = parseInt(drawer.getAttribute('data-free-shipping') || '0', 10);

    if (!cart.items.length) {
      body.innerHTML = '<div class="cart-empty"><h3>' + escapeHtml(strings.cartEmpty || 'Your cart is empty') + '</h3>' +
        '<p>' + escapeHtml(strings.cartEmptyText || '') + '</p>' +
        '<a class="button" href="' + escapeHtml(drawer.getAttribute('data-shop-url') || '/collections/all') + '">' + escapeHtml(strings.continueShopping || 'Shop now') + '</a></div>';
      footer.hidden = true;
      return;
    }

    var html = '';
    if (threshold > 0) {
      var remaining = threshold - cart.total_price;
      var pct = Math.min(100, Math.round((cart.total_price / threshold) * 100));
      html += '<div class="cart-progress">' + (remaining > 0
        ? (strings.freeShippingAway || 'You are [amount] away from free shipping').replace('[amount]', '<strong>' + formatMoney(remaining) + '</strong>')
        : '🎉 ' + escapeHtml(strings.freeShippingUnlocked || 'You unlocked free shipping!')) +
        '<div class="cart-progress__bar"><span style="width:' + pct + '%"></span></div></div>';
    }
    cart.items.forEach(function (item) {
      var img = item.image ? '<img src="' + escapeHtml(item.image) + '" alt="" width="84" height="84" loading="lazy">' : '';
      var variant = item.variant_title && item.variant_title !== 'Default Title' ? '<div class="cart-item__variant">' + escapeHtml(item.variant_title) + '</div>' : '';
      var compare = item.original_line_price > item.final_line_price ? '<s>' + formatMoney(item.original_line_price) + '</s>' : '';
      (item.line_level_discount_allocations || []).forEach(function (d) {
        variant += '<div class="cart-item__variant cart-item__discount">' + escapeHtml(d.discount_application.title) + ' (−' + formatMoney(d.amount) + ')</div>';
      });
      html += '<div class="cart-item" data-key="' + escapeHtml(item.key) + '">' +
        '<a class="cart-item__image" href="' + escapeHtml(item.url || '#') + '">' + img + '</a>' +
        '<div><div class="cart-item__title">' + escapeHtml(item.product_title || item.title) + '</div>' + variant +
        '<div class="qty"><button type="button" data-qty-change="-1" aria-label="' + escapeHtml(strings.decrease || 'Decrease') + '">−</button>' +
        '<input type="number" min="0" value="' + item.quantity + '" aria-label="' + escapeHtml(strings.quantity || 'Quantity') + '" data-qty-input>' +
        '<button type="button" data-qty-change="1" aria-label="' + escapeHtml(strings.increase || 'Increase') + '">+</button></div>' +
        '<div><button type="button" class="cart-item__remove" data-remove>' + escapeHtml(strings.remove || 'Remove') + '</button></div></div>' +
        '<div class="cart-item__price">' + compare + formatMoney(item.final_line_price) + '</div></div>';
    });

    var upsell = drawer.querySelector('template[data-upsell]');
    if (upsell) {
      var upsellId = upsell.getAttribute('data-variant-id');
      var inCart = cart.items.some(function (i) { return String(i.id) === String(upsellId) || String(i.variant_id) === String(upsellId); });
      if (!inCart) html += upsell.innerHTML;
    }
    body.innerHTML = html;

    footer.hidden = false;
    footer.querySelector('[data-cart-total]').textContent = formatMoney(cart.total_price);
    var savingsRow = footer.querySelector('[data-cart-savings-row]');
    var saved = (cart.original_total_price || cart.total_price) - cart.total_price;
    if (savingsRow) {
      savingsRow.hidden = saved <= 0;
      savingsRow.querySelector('[data-cart-savings]').textContent = formatMoney(saved);
    }
  }

  function refreshCart() { return Cart.get().then(renderCart).catch(function () {}); }
  Theme.refreshCart = refreshCart;

  document.addEventListener('click', function (e) {
    var row = e.target.closest('.cart-item');
    if (!row) return;
    var key = row.getAttribute('data-key');
    var input = row.querySelector('[data-qty-input]');
    if (e.target.closest('[data-remove]')) { Cart.change(key, 0).then(renderCart); return; }
    var btn = e.target.closest('[data-qty-change]');
    if (btn) {
      var q = Math.max(0, parseInt(input.value, 10) + parseInt(btn.getAttribute('data-qty-change'), 10));
      row.style.opacity = '.5';
      Cart.change(key, q).then(renderCart);
    }
  });
  document.addEventListener('change', function (e) {
    if (!e.target.matches('.cart-item [data-qty-input]')) return;
    var row = e.target.closest('.cart-item');
    Cart.change(row.getAttribute('data-key'), Math.max(0, parseInt(e.target.value, 10) || 0)).then(renderCart);
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-quick-add]');
    if (!b) return;
    e.preventDefault();
    b.setAttribute('aria-disabled', 'true');
    Cart.add([{ id: Number(b.getAttribute('data-quick-add')), quantity: 1 }])
      .then(function () { return refreshCart(); })
      .then(function () { b.removeAttribute('aria-disabled'); if (!document.getElementById('cart-drawer').classList.contains('is-open')) openDrawerEl(document.getElementById('cart-drawer')); })
      .catch(function (err) { b.removeAttribute('aria-disabled'); alert(err.message); });
  });

  /* -------------------------------------------------------- product form */
  function initProduct(root) {
    var dataEl = root.querySelector('[data-product-json]');
    if (!dataEl) return;
    var product = JSON.parse(dataEl.textContent);
    var form = root.querySelector('[data-product-form]');
    var idInput = form.querySelector('input[name="id"]');
    var qtyInput = form.querySelector('input[name="quantity"]');
    var submit = form.querySelector('[data-add-to-cart]');
    var submitText = submit.querySelector('[data-add-to-cart-text]');
    var errorEl = form.querySelector('[data-form-error]');
    var current = product.variants.filter(function (v) { return v.id == idInput.value; })[0] || product.variants[0];

    function selectedOptions() {
      return Array.prototype.map.call(root.querySelectorAll('[data-option-index]'), function (group) {
        var checked = group.querySelector('input:checked');
        return checked ? checked.value : null;
      });
    }
    function bundleInput() {
      return root.querySelector('.bundle__input:checked');
    }
    if (root.querySelector('.bundle__input') && !bundleInput()) root.querySelector('.bundle__input').checked = true;
    function bundleQty() {
      var b = bundleInput();
      if (b) return parseInt(b.value, 10);
      var picker = root.querySelector('[data-quantity-input]');
      return picker ? Math.max(1, parseInt(picker.value, 10) || 1) : 1;
    }
    var quantityPicker = root.querySelector('.quantity-picker');
    if (quantityPicker && root.querySelector('.bundle__input')) quantityPicker.hidden = true;
    root.addEventListener('click', function (e) {
      var step = e.target.closest('[data-qty-step]');
      if (!step) return;
      var input = root.querySelector('[data-quantity-input]');
      input.value = Math.max(1, (parseInt(input.value, 10) || 1) + parseInt(step.getAttribute('data-qty-step'), 10));
      update();
    });
    function bundleDiscount() {
      var b = bundleInput();
      return b ? parseFloat(b.getAttribute('data-discount') || '0') : 0;
    }
    function variantById(id) {
      return product.variants.filter(function (v) { return v.id == id; })[0];
    }
    // One variant per item in a bundle: the per-item size selects when shown, else the selected variant.
    function bundleUnits(bundle, qty) {
      var selects = bundle ? bundle.querySelectorAll('[data-bundle-unit-select]') : [];
      if (selects.length) return Array.prototype.map.call(selects, function (sel) { return variantById(sel.value) || current; });
      var units = [];
      for (var n = 0; n < qty; n++) units.push(current);
      return units;
    }
    function bundleTotals(units, discount) {
      var price = 0, compare = 0;
      units.forEach(function (v) { price += v.price; compare += Math.max(v.compare_at_price || 0, v.price); });
      return { price: Math.round(price * (1 - discount / 100)), compare: compare };
    }
    function tick(el, text) {
      if (!el || el.textContent === text) return;
      el.textContent = text;
      el.classList.remove('is-ticking'); void el.offsetWidth; el.classList.add('is-ticking');
    }

    function update() {
      var opts = selectedOptions();
      if (opts.length) {
        current = product.variants.filter(function (v) {
          return v.options.every(function (o, i) { return opts[i] == null || o === opts[i]; });
        })[0];
      }
      if (!current) {
        submit.disabled = true;
        submitText.textContent = strings.unavailable || 'Unavailable';
        return;
      }
      idInput.value = current.id;
      var qty = bundleQty();
      qtyInput.value = qty;
      // per-item size selects follow the main picker until the shopper changes them
      root.querySelectorAll('[data-bundle-unit-select]:not([data-touched])').forEach(function (sel) { sel.value = current.id; });
      var selectedBundle = bundleInput() ? bundleInput().closest('[data-bundle]') : null;
      var units = bundleUnits(selectedBundle, qty);
      var available = units.every(function (v) { return v.available; });
      var lineTotal = bundleTotals(units, bundleDiscount()).price;
      submit.disabled = !available;
      tick(submitText, available
        ? (strings.addToCart || 'Add to cart') + ' — ' + formatMoney(lineTotal)
        : (strings.soldOut || 'Sold out'));

      root.querySelectorAll('[data-price]').forEach(function (el) { el.textContent = formatMoney(current.price); });
      root.querySelectorAll('[data-compare-price]').forEach(function (el) {
        el.textContent = current.compare_at_price > current.price ? formatMoney(current.compare_at_price) : '';
        el.hidden = !(current.compare_at_price > current.price);
      });
      root.querySelectorAll('[data-save-badge]').forEach(function (el) {
        var show = current.compare_at_price > current.price;
        el.hidden = !show;
        if (show) el.textContent = (strings.save || 'Save') + ' ' + Math.round((1 - current.price / current.compare_at_price) * 100) + '%';
      });
      // bundle prices follow the selected variant (and the per-item sizes of the selected bundle)
      root.querySelectorAll('[data-bundle]').forEach(function (b) {
        var input = b.querySelector('.bundle__input');
        var q = parseInt(input.value, 10);
        var t = bundleTotals(input.checked ? units : bundleUnits(null, q), parseFloat(input.getAttribute('data-discount') || '0'));
        tick(b.querySelector('[data-bundle-price]'), formatMoney(t.price));
        var c = b.querySelector('[data-bundle-compare]');
        if (c) { c.textContent = formatMoney(t.compare); c.hidden = !(t.compare > t.price); }
        var save = b.querySelector('[data-bundle-save]');
        if (save) save.textContent = formatMoney(t.compare - t.price);
        var unit = b.querySelector('[data-bundle-unit]');
        if (unit) unit.textContent = formatMoney(Math.floor(t.price / q));
        b.classList.toggle('is-selected', input.checked);
      });
      root.querySelectorAll('[data-selected-option]').forEach(function (el) {
        el.textContent = opts[parseInt(el.getAttribute('data-selected-option'), 10)] || '';
      });
      // grey-out unavailable combinations for the last option
      root.querySelectorAll('[data-option-index]').forEach(function (group) {
        var idx = parseInt(group.getAttribute('data-option-index'), 10);
        group.querySelectorAll('input').forEach(function (input) {
          var trial = opts.slice(); trial[idx] = input.value;
          var match = product.variants.filter(function (v) { return v.options.every(function (o, i) { return o === trial[i]; }); })[0];
          input.disabled = !match;
          input.nextElementSibling.classList.toggle('is-soldout', !!match && !match.available);
        });
      });
      if (current.featured_media_id) showMedia(root, current.featured_media_id);
      if (!Theme.preview && window.history.replaceState && root.hasAttribute('data-update-url')) {
        var url = new URL(window.location.href);
        url.searchParams.set('variant', current.id);
        window.history.replaceState({}, '', url.toString());
      }
      var sticky = document.querySelector('[data-sticky-price]');
      if (sticky && root.hasAttribute('data-update-url')) sticky.textContent = formatMoney(lineTotal);
    }

    root.addEventListener('change', function (e) {
      if (e.target.matches('[data-bundle-unit-select]')) e.target.setAttribute('data-touched', '');
      if (e.target.closest('[data-option-index]') || e.target.closest('[data-bundle]') || e.target.matches('[data-quantity-input]')) update();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!current) return;
      var selectedBundle = bundleInput() ? bundleInput().closest('[data-bundle]') : null;
      var units = bundleUnits(selectedBundle, bundleQty());
      if (!units.every(function (v) { return v.available; })) return;
      errorEl.hidden = true;
      submit.setAttribute('aria-busy', 'true');
      submit.disabled = true;
      var items = [];
      units.forEach(function (v) {
        var line = items.filter(function (i) { return i.id === v.id; })[0];
        if (line) line.quantity += 1; else items.push({ id: v.id, quantity: 1 });
      });
      var addon = root.querySelector('[data-addon]:checked');
      if (addon) items.push({ id: Number(addon.value), quantity: 1 });
      var giftInput = root.querySelector('[data-bundle-gift]');
      var giftId = giftInput && bundleInput() && bundleInput().getAttribute('data-gift') === 'true' ? Number(giftInput.value) : null;
      // add the free gift once: skip it when it is already in the cart
      var ready = giftId
        ? Cart.get().then(function (cart) {
            var inCart = (cart.items || []).some(function (i) { return i.id === giftId || i.variant_id === giftId; });
            if (!inCart && !items.some(function (i) { return i.id === giftId; })) items.push({ id: giftId, quantity: 1 });
          }).catch(function () {})
        : Promise.resolve();
      ready
        .then(function () { return Cart.add(items); })
        .then(function () { return refreshCart(); })
        .then(function () {
          var drawer = document.getElementById('cart-drawer');
          if (drawer) openDrawerEl(drawer); else window.location.href = routes.cart_url;
        })
        .catch(function (err) { errorEl.textContent = err.message; errorEl.hidden = false; })
        .then(function () { submit.removeAttribute('aria-busy'); submit.disabled = false; });
    });

    update();
  }

  /* ------------------------------------------------------------- gallery */
  function showMedia(root, mediaId) {
    var slides = root.querySelectorAll('[data-media-id]');
    if (!slides.length) return;
    var found = false;
    slides.forEach(function (s) { var on = s.getAttribute('data-media-id') == mediaId; s.classList.toggle('is-active', on); if (on) found = true; });
    if (!found) return;
    root.querySelectorAll('[data-thumb]').forEach(function (t) { t.classList.toggle('is-active', t.getAttribute('data-thumb') == mediaId); });
  }
  function initGallery(root) {
    root.addEventListener('click', function (e) {
      var thumb = e.target.closest('[data-thumb]');
      if (thumb) { showMedia(root, thumb.getAttribute('data-thumb')); return; }
      var nav = e.target.closest('[data-gallery-nav]');
      if (nav) {
        var slides = Array.prototype.slice.call(root.querySelectorAll('[data-media-id]'));
        var idx = slides.findIndex(function (s) { return s.classList.contains('is-active'); });
        var next = (idx + parseInt(nav.getAttribute('data-gallery-nav'), 10) + slides.length) % slides.length;
        showMedia(root, slides[next].getAttribute('data-media-id'));
      }
    });
    // swipe on touch devices
    var main = root.querySelector('.product-gallery__main');
    if (!main) return;
    var startX = null;
    main.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    main.addEventListener('touchend', function (e) {
      if (startX == null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { var btn = root.querySelector('[data-gallery-nav="' + (dx < 0 ? 1 : -1) + '"]'); if (btn) btn.click(); }
      startX = null;
    });
  }

  /* -------------------------------------------------------- sticky ATC */
  function initStickyAtc() {
    var bar = document.querySelector('[data-sticky-atc]');
    var target = document.querySelector('[data-add-to-cart]');
    if (!bar || !target || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      bar.classList.toggle('is-visible', !e.isIntersecting && e.boundingClientRect.top < 0);
    }).observe(target);
    bar.querySelector('button').addEventListener('click', function () {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ---------------------------------------------------- announcement bar */
  function initAnnouncement() {
    document.querySelectorAll('[data-announcement]').forEach(function (bar) {
      var slides = bar.querySelectorAll('.announcement-bar__slide');
      if (slides.length < 2) return;
      var i = 0;
      var speed = parseInt(bar.getAttribute('data-speed') || '4', 10) * 1000;
      setInterval(function () {
        slides[i].classList.remove('is-active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('is-active');
      }, speed);
    });
  }

  /* --------------------------------------------------- reviews load more */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-reviews-more]');
    if (!btn) return;
    var section = btn.closest('section') || document;
    var hidden = section.querySelectorAll('.review-card.is-hidden');
    Array.prototype.slice.call(hidden, 0, 6).forEach(function (c, i) { c.classList.remove('is-hidden'); c.classList.add('is-revealing', 'is-visible'); c.style.animationDelay = (i * 80) + 'ms'; });
    if (section.querySelectorAll('.review-card.is-hidden').length === 0) btn.hidden = true;
  });

  /* ------------------------------------------------- preview-only forms */
  document.addEventListener('submit', function (e) {
    if (!Theme.preview || !e.target.matches('[data-preview-form]')) return;
    e.preventDefault();
    var msg = e.target.querySelector('[data-preview-message]');
    if (msg) { msg.hidden = false; }
    e.target.reset();
  });

  /* ----------------------------------------------------------- motion */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Elements that fade up as they scroll into view. Siblings get a stagger index.
  var REVEAL_SELECTORS = [
    '.section-header', '.problem__media', '.problem > div:not(.problem__media)', '.step', '.feature',
    '.compare', '.review-card', '.reviews-summary', '.guarantee', '.promo', '.faq-layout__intro', '.faq details',
    '.newsletter', '.card', '.trust-bar__item', '.collection-hero', '.contact-card', '.main-page > *',
    '.product__media', '.site-footer__grid > *', '.logo-row__item'
  ].join(',');

  function tagReveals(root) {
    root.querySelectorAll(REVEAL_SELECTORS).forEach(function (el) {
      if (el.closest('.hero') || el.closest('.drawer') || el.closest('[data-product] .product__info')) return;
      el.classList.add('reveal');
      if (el.matches('.problem__media, .promo, .guarantee, .compare, .product__media')) el.classList.add('reveal--scale');
      var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.matches(REVEAL_SELECTORS); });
      var idx = siblings.indexOf(el);
      if (idx > 0) el.style.setProperty('--d', Math.min(idx, 6));
    });
    root.querySelectorAll('.compare tbody tr').forEach(function (tr, i) { tr.style.setProperty('--row', i); });
  }

  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    if (isNaN(target) || reduceMotion) return;
    var start = null, dur = 1400;
    function frame(t) {
      if (start === null) start = t;
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(frame);
    }
    el.textContent = (0).toFixed(decimals);
    requestAnimationFrame(frame);
  }

  function initReveal(root) {
    root = root || document;
    tagReveals(root);
    var els = root.querySelectorAll('.reveal, [data-count]');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        if (en.target.hasAttribute('data-count')) countUp(en.target);
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initHero() {
    document.querySelectorAll('[data-hero]').forEach(function (hero) {
      requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add('is-loaded'); }); });
    });
  }

  function initHeaderState() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initParallax() {
    var items = document.querySelectorAll('[data-parallax]');
    if (!items.length || reduceMotion) return;
    var ticking = false;
    function update() {
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var offset = (r.top + r.height / 2 - window.innerHeight / 2) * -0.06;
        el.style.setProperty('--parallax', offset.toFixed(1) + 'px');
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  // Product recommendations: swap in Shopify's picks when the API returns any
  function initRecommendations() {
    document.querySelectorAll('[data-recommendations]').forEach(function (section) {
      if (Theme.preview || section.dataset.loaded) return;
      section.dataset.loaded = 'true';
      fetch(section.getAttribute('data-url'))
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (html) {
          if (!html) return;
          var doc = new DOMParser().parseFromString(html, 'text/html');
          var grid = doc.querySelector('[data-recommendations-grid]');
          var target = section.querySelector('[data-recommendations-grid]');
          if (grid && target && grid.children.length) {
            target.innerHTML = grid.innerHTML;
            target.querySelectorAll('.card').forEach(function (c) { c.classList.add('is-revealing'); });
          }
        })
        .catch(function () {});
    });
  }

  // Selects that apply immediately (sort order, country, language)
  document.addEventListener('change', function (e) {
    if (e.target.matches('select[data-auto-submit]') && e.target.form && !Theme.preview) e.target.form.submit();
  });

  // Close filter dropdowns when clicking elsewhere
  document.addEventListener('click', function (e) {
    document.querySelectorAll('details.filter[open]').forEach(function (d) { if (!d.contains(e.target)) d.removeAttribute('open'); });
  });

  // Focus the search field when the search modal opens
  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-modal-open="search-modal"]')) return;
    setTimeout(function () { var i = document.getElementById('HeaderSearch'); if (i) i.focus(); }, 60);
  });

  // Smooth open/close for <details> in the FAQ and product tabs
  document.addEventListener('click', function (e) {
    var summary = e.target.closest('.faq summary, .accordion summary');
    if (!summary || reduceMotion || !summary.animate) return;
    var details = summary.parentElement;
    e.preventDefault();
    if (details.classList.contains('is-animating')) return;
    var startH = details.offsetHeight;
    details.classList.add('is-animating');
    if (details.open) {
      var endH = summary.offsetHeight;
      var anim = details.animate({ height: [startH + 'px', endH + 'px'] }, { duration: 380, easing: 'cubic-bezier(.22,.8,.24,1)' });
      anim.onfinish = function () { details.open = false; details.classList.remove('is-animating'); };
    } else {
      details.open = true;
      var fullH = details.offsetHeight;
      var anim2 = details.animate({ height: [startH + 'px', fullH + 'px'] }, { duration: 420, easing: 'cubic-bezier(.22,.8,.24,1)' });
      anim2.onfinish = function () { details.classList.remove('is-animating'); };
    }
  });

  /* ---------------------------------------------------------- init */
  function init() {
    initAnnouncement();
    document.querySelectorAll('[data-product]').forEach(function (root) { initProduct(root); initGallery(root); });
    initStickyAtc();
    initHero();
    initHeaderState();
    initParallax();
    initReveal();
    initRecommendations();
    refreshCart();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  // Re-initialise sections when edited in the theme editor
  document.addEventListener('shopify:section:load', function (e) {
    e.target.querySelectorAll('[data-product]').forEach(function (root) { initProduct(root); initGallery(root); });
    initAnnouncement();
    initReveal(e.target);
    initRecommendations();
    e.target.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
    initHero();
  });
})();
