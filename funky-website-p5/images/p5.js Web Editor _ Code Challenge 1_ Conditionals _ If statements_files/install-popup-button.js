(function (w, d) {
    'use strict';

    if (w.DBOX_INSTALLED) return;
    w.DBOX_INSTALLED = true;

    var UTM_PARAMS = extractUtmParams();

    function extractUtmParams() {
      var data = {};
      var queryString = window.location.href.split('?')[1];
      if(queryString) {
        var supportedUtmParams = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_term', 'utm_content'];
        var params = queryString.split('&');
        params.map(function(p){
          var splitted = p.split('='),  key = splitted[0], value = splitted[1];

          if(supportedUtmParams.indexOf(key) >= 0) {
            data[key] = value;
          }
        });
      }

      return data;
    }

    var buttonClass  = 'dbox-donation-button',
        frameID = 'donorbox_widget_frame',
        setFrameStyles = function (style) {
          style.position = 'fixed';
          style.display = 'block';
          style.left = '0px';
          style.top = '0px';
          style.width = '100%';
          style.height = '100%';
          style.margin = '0px';
          style.padding = '0px';
          style.border = 'none';
          style.overflowX = 'hidden';
          style.overflowY = 'auto';
          style.visibility = 'visible';
          style.backgroundColor = 'transparent';
          style.zIndex = 2147483647;
        };

    function toggleScrolling(disable) {
        d.body.style.overflow = disable ? 'hidden' : 'auto';
    }

    function remove(el) {
        enableScrolling()
        hideVisibility(el)
    }

    function enableScrolling() {
      d.body.style.overflow = 'auto';
    }

    function hideVisibility(el) {
      el.style.display = 'none';
    }

    function toggleVisibility(el) {
        if (el.style.display === 'none') {
            el.style.display = '';
        } else {
            el.style.display = 'none';
        }
    }

    function queryButtons() {
        var links = d.getElementsByClassName(buttonClass), arr = function (arrayLike) {
            return Array.prototype.slice.call(arrayLike)
        };
        if (typeof w.DonorBox == 'object' && w.DonorBox.widgetLinkClassName)
            links = arr(links).concat(arr(d.getElementsByClassName(w.DonorBox.widgetLinkClassName)));
        return links;
    }

    function shouldOpenNewTab() {
      var agent = navigator.userAgent.toLowerCase();
      return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(agent)||
             /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0,4));
    }

    function addEventListener(target, ev, listener) {
        if (target.addEventListener)
            target.addEventListener(ev, listener, false);
        else if (target.attachEvent)
            target.attachEvent('on' + ev, listener);
        else target['on' + ev] = ev
    }

    function openTheModal(e) {
        e.preventDefault();
        e.stopPropagation();

        var target = e.currentTarget || e.target,
            existingFrame = document.querySelector(`#${frameID}[data-src="${target.href}"]`);

        if (existingFrame) {
            toggleVisibility(existingFrame);
            existingFrame.focus();
        } else {
            var frame = document.createElement('iframe');
            toggleScrolling(true);
            frame.id = frameID;
            frame.frameBorder = 0; // Correct property name is frameBorder in camelCase for setting via JavaScript
            frame.setAttribute('allowpaymentrequest', true);
            frame.setAttribute("data-src", target.href);
            frame.setAttribute("allow", "payment");
            frame.src = target.href + (target.href.indexOf('?') == -1 ? '?' : '&') + 'modal=true';
            setFrameStyles(frame.style);
            document.body.appendChild(frame);
            frame.focus();

            // Send UTM Params to donorbox iframes
            if(Object.keys(UTM_PARAMS).length > 0) {
                frame.onload = function() {
                    frame.contentWindow.postMessage({action: 'set-utm-params', msg: UTM_PARAMS}, '*');
                };
            }
        }

        if (target.hasAttribute('data-reminder-widget-enabled'))
          donationReminderWidget.setCookies({ href: target.href, lastVisitedAt: new Date() })
    }

    w.dw_open = function () {
        var buttons = queryButtons(), i = 0, len = buttons.length;
        if (len == 0) throw 'Donation widget button is not exists. If you see these on your WEB page, please, check button installation steps.';

        if (shouldOpenNewTab())
          for(; i < len; i++)
              buttons[i].setAttribute('target', '_blank');
        else
          for(; i < len; i++)
              addEventListener(buttons[i], 'click', openTheModal)
    };

    addEventListener(w, 'message', function (e) {
        typeof e.data == 'object' && e.data.from == 'dbox' &&
          e.data.close === true && d.querySelectorAll(`#${frameID}`).forEach(remove)
    });

    function createStickyPopupButton() {

      var scripts = document.querySelectorAll("script#donorbox-popup-button-installer[data-href]");

      scripts.forEach(function (script) {
        const button = document.createElement('a');
        button.href = script.getAttribute('data-href');
        button.className = 'dbox-donation-button';
        button.innerText = script.getAttribute('data-button-cta') || 'Donate';
        button.style.cssText = script.getAttribute('data-style');

        const imgSrc = script.getAttribute('data-img-src');
        if (imgSrc) {
          const imgElement = document.createElement('img');
          imgElement.src = imgSrc;
          button.insertBefore(imgElement, button.firstChild);
        }

        if (script.hasAttribute('data-reminder-widget-enabled')) {
          button.setAttribute('data-reminder-widget-enabled', true);
        }

        if (script.hasAttribute('data-reminder-widget-cta')) {
          button.setAttribute('data-reminder-widget-cta', script.getAttribute('data-reminder-widget-cta'));
        }

        document.body.appendChild(button);
      });
    }

    function createLinkTag() {
      var domain = document.querySelector("script[src$='install-popup-button.js']").src.replace(/\/[^/]*$/, '/');

      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.type = 'text/css';
      linkElement.href = domain + 'animate-popup-donate-button.css';

      document.head.appendChild(linkElement);
    }

    let _cookies = (function(){

      function set(name, value, expires) {
        document.cookie = name + '=' + JSON.stringify(value) + ';expires=' + expires;
      }

      function get(name) {
        let cookieString = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop();
        return cookieString == undefined ? null : JSON.parse(cookieString);
      }

      function remove(name) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970";
      }

      return {set, get, remove}
    })();

    let donationReminderWidget = (function() {
      const COOKIE_CONSENT_NAME = 'donorbox_reminder_widget';
      const widgetClass = 'dbox-reminder-widget';
      const ctaButtonClass = `${widgetClass}__popup-button`;
      const hideButtonClass = `${widgetClass}__close-button`;
      let widget, ctaButton, hideButton;

      function initialize() {
        if (document.querySelector('.'+widgetClass) !== null) return;

        render();
        setup();
      }

      function render() {
        var reminderWidgetHtml = `
          <div class="${widgetClass}" style="opacity: 0;">
            <a class="${ctaButtonClass}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4458 8.48483C23.4458 11.2624 21.6556 14.1928 18.08 17.2417C16.2005 18.8253 14.1573 20.2067 11.9901 21.366C9.82789 20.2067 7.78966 18.8154 5.92005 17.2318C2.34447 14.1829 0.554199 11.2426 0.554199 8.47497C0.554199 5.06597 2.81063 2.63379 5.92996 2.63379C7.34829 2.63379 8.1864 2.77686 9.1584 3.24553C9.70887 3.49714 10.2048 3.84741 10.6412 4.27662L12.0149 5.67771L13.3688 4.27662C13.7952 3.83754 14.3011 3.47741 14.8664 3.21593C15.8087 2.78673 16.5922 2.64859 18.075 2.64859C21.1497 2.66832 23.4458 5.1301 23.4458 8.4799V8.48483Z"/>
            </svg>Complete your gift to make an impact</a>
            <svg class="${hideButtonClass}" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <g clip-path="url(#clip0_932_135)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292492 0.305288C0.479831 0.117817 0.733884 0.0125018 0.998781 0.0125018C1.26368 0.0125018 1.51773 0.117817 1.70507 0.305288L5.99375 4.59829L10.2824 0.305288C10.3746 0.209778 10.4848 0.133596 10.6067 0.0811869C10.7286 0.0287779 10.8597 0.00119157 10.9923 3.77571e-05C11.125 -0.00111606 11.2565 0.0241854 11.3793 0.0744663C11.5021 0.124747 11.6136 0.199 11.7074 0.292893C11.8012 0.386786 11.8754 0.498438 11.9256 0.621334C11.9758 0.744231 12.0011 0.87591 12 1.00869C11.9988 1.14147 11.9713 1.27269 11.9189 1.39469C11.8665 1.5167 11.7904 1.62704 11.695 1.71929L7.40633 6.01229L11.695 10.3053C11.877 10.4939 11.9777 10.7465 11.9754 11.0087C11.9731 11.2709 11.8681 11.5217 11.6828 11.7071C11.4976 11.8925 11.2471 11.9977 10.9851 12C10.7232 12.0022 10.4709 11.9014 10.2824 11.7193L5.99375 7.42629L1.70507 11.7193C1.51666 11.9014 1.26431 12.0022 1.00238 12C0.740443 11.9977 0.489883 11.8925 0.304661 11.7071C0.11944 11.5217 0.0143761 11.2709 0.0121 11.0087C0.00982384 10.7465 0.110517 10.4939 0.292492 10.3053L4.58118 6.01229L0.292492 1.71929C0.10521 1.53176 0 1.27745 0 1.01229C0 0.747124 0.10521 0.492816 0.292492 0.305288Z"/>
              </g>
              <defs>
                <clipPath id="clip0_932_135">
                  <rect width="12" height="12" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>`;

        var tempDivElement = document.createElement('div');
        tempDivElement.innerHTML = reminderWidgetHtml;
        document.body.appendChild(tempDivElement.firstElementChild);
      }

      function setup() {
        ctaButton = document.querySelector('a.' + ctaButtonClass);
        addEventListener(ctaButton, 'click', openTheModal);
        addEventListener(ctaButton, 'click', hide);

        hideButton = document.querySelector("svg." + hideButtonClass);
        addEventListener(hideButton, 'click', hide);
        addEventListener(hideButton, 'click', updateCookies);

        widget = document.querySelector("div."+ widgetClass);
      }

      function popupClosed({data}) {
        if (!data.hasOwnProperty('donation')) return;
        if (data.donation.success) {
          hide();
          delete_cookies();
          return;
        }

        var button = document.querySelector(`a.dbox-donation-button[data-reminder-widget-enabled][href="${data.src.replace('&modal=true', '')}"]`);

        if (button) {
          update(button);
          show();
        }
      }

      function show() {
        widget.style.opacity = 1;
        widget.classList.add(widgetClass + "--show");
      }
      function hide() {
        widget.style.opacity = 0;
        widget.classList.remove(widgetClass + "--show");
      }

      function update(button) {
        ctaButton.href = button.href;

        var textNode = ctaButton.childNodes[1];
        textNode.nodeValue = button.getAttribute('data-reminder-widget-cta') || 'Complete your gift to make an impact';
      }

      function setCookies(data) {
        var sixtyDaysFromNow = new Date(Date.now() + 60 * 24 * 3600 * 1000);
        _cookies.set(COOKIE_CONSENT_NAME, data, sixtyDaysFromNow.toUTCString());
      }

      function checkCookies() {
        let data = _cookies.get(COOKIE_CONSENT_NAME)
        if (data == null) return;

        let widgetClosedAt = data.widgetClosedAt ? new Date(data.widgetClosedAt) : false;
        let twentyFourHoursAgo = new Date(Date.now() - 24 * 3600 * 1000);

        if (widgetClosedAt && twentyFourHoursAgo <= widgetClosedAt) return;

        var campaignURL = removeTrackingParams(data.href);
        var button = document.querySelector(`a.dbox-donation-button[data-reminder-widget-enabled][href^="${campaignURL}"]`);
        if (button) {
          update(button);
          show();
        }
      }

      function updateCookies() {
        let data = _cookies.get(COOKIE_CONSENT_NAME);
        if (data) {
          data.widgetClosedAt = new Date().toUTCString();
          _cookies.set(COOKIE_CONSENT_NAME, data);
        }
      }

      function delete_cookies() {
        _cookies.remove(COOKIE_CONSENT_NAME)
      }

      function removeTrackingParams(url) {
        let urlObject = new URL(url);
        let paramsToRemove = ["_gl", "_ga"];
        paramsToRemove.forEach(param => urlObject.searchParams.delete(param));
        return urlObject.toString();
      }

      initialize();

      return {popupClosed, setCookies, checkCookies};
    })();

  createStickyPopupButton();
  createLinkTag();
  addEventListener(w, 'message', donationReminderWidget.popupClosed);
  addEventListener(d, 'DOMContentLoaded', donationReminderWidget.checkCookies);

  w.dw_open();
}(window, document));
