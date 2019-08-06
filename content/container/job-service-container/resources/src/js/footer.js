import { POINT_CONVERSION_COMPRESSED } from "constants";
const jQuery = require('jquery');
const cronstrue = require('cronstrue');

module.exports = {
    init: function () {
    
        (function () {
            if (typeof NodeList.prototype.forEach === "function") return false;
            NodeList.prototype.forEach = Array.prototype.forEach;
        })();

        function scrollToTop() {
            let body = document.querySelector('.__reactapp_body_loaded');
            if (body) {
                body.scrollIntoView(true);
            }
        }
        window.scrollToTop = scrollToTop;

        function addRadioLabels() {
            let radioLabels = document.querySelectorAll('.__cis_radio_label');
            radioLabels.forEach(function (radioLabel) {
                let newLabelTag = document.createElement("label");
                newLabelTag.className = radioLabel.className;
                newLabelTag.id = radioLabel.id;
                newLabelTag.setAttribute('style', radioLabel.getAttribute('style'));
                radioLabel.replaceWith(newLabelTag);
                let childNodes = radioLabel.childNodes;
                while (childNodes.length > 0) {
                    newLabelTag.appendChild(childNodes[ 0 ]);
                }
            })
            addLabelStyle();
        }
        window.addRadioLabels = addRadioLabels;

        function addLabelStyle() {
            let labels = document.querySelectorAll('label');
            labels.forEach(function (label) {
                label.addEventListener('click', function (e) {
                    let radio = label.querySelector('input');
                    if (radio && radio.checked) {
                        labels.forEach(function (el) {
                            el.classList.remove('__cis_selected');
                        })
                        label.classList.add('__cis_selected');
                    }
                })
            })
        }
        window.addLabelStyle = addLabelStyle;

        function updateProgressBar() {
            let elem = document.querySelectorAll('.rc-steps-icon')[ document.querySelectorAll('.rc-steps-icon').length - 1 ];
            if (elem) {
                elem.removeChild(elem.childNodes[ 0 ]);
                elem.classList.add('fa');
                elem.classList.add('fa-usd');
                elem.classList.add('green-font');
            }
        }
        window.updateProgressBar = updateProgressBar;

        let toggleAccordion = function () {
            let toggle = event.srcElement;
            let panelId = toggle.getAttribute('aria-controls');
            if (toggle.attributes[ 'aria-expanded' ].value === "false") {
                toggle.setAttribute('aria-expanded', "true")
                jQuery(`#${panelId}`).slideDown();
            } else if (toggle.attributes[ 'aria-expanded' ].value === "true") {
                toggle.setAttribute('aria-expanded', "false")
                jQuery(`#${panelId}`).slideUp();
            }
        };
        window.toggleAccordion = toggleAccordion;
 
        function addRadioFor() {
            let labels = document.querySelectorAll('.__cis_radio_label_grp')
            for (var i = 0; i < labels.length; i++) {
                let label = labels[ i ].querySelector('label');
                let input = labels[ i ].querySelector('input');
                label.setAttribute('for', input.id);
                input.insertAdjacentElement('afterEnd', label);
            }
        }
        window.addRadioFor = addRadioFor;

        let currentPageInput;
        function setTextareaPointerEvents(value) {
            if (currentPageInput && document.body.contains(currentPageInput[ 0 ])) {
                for (let i = 0; i < currentPageInput.length; i++) {
                    currentPageInput[ i ].style.pointerEvents = value;
                }
            }
        };

        let initInputScroll = function () {
            currentPageInput = document.querySelectorAll('input[type="text"]');
            setTextareaPointerEvents('none');
            window.currentPageInput = currentPageInput;
        }
        window.initInputScroll = initInputScroll;

        document.addEventListener('touchstart', function () {
            setTextareaPointerEvents('auto');
        });

        document.addEventListener('click', function () {
            setTextareaPointerEvents('auto');
        });

        document.addEventListener('touchmove', function () {
            setTextareaPointerEvents('none');
        });

        document.addEventListener('touchend', function () {
            setTimeout(function () {
                setTextareaPointerEvents('none');
            }, 500);
        });

        function formatPhoneNumber(e, element) {
            let currentVal = _formatPhoneNumbers(e.target.value);
            currentVal = currentVal.substring(0, 14);
            let updated_state = {};
            updated_state[ element.name ] = currentVal;
            this.setState(updated_state);
        };
        window.formatPhoneNumber = formatPhoneNumber;

        function formatCurrency(e, target) {
            let numeral = window.__reactadmin.__ra_helpers.numeral;
            if (target.name === 'income' || target.name === 'household_annual_income') {
                e.target.value = e.target.value.substring(0, 10);
            }
            let currentVal = numeral(e.target.value).format('$0,0');
            let updated_state = {};
            updated_state[ target.name ] = currentVal;
            this.setState(updated_state);
        };
        window.formatCurrency = formatCurrency;

        function financialFormOnChange(e) {
            const filtered_degrees = [ 'Highest Degree', 'None', 'High School Diploma', ];
            if (!e.degree || ~filtered_degrees.indexOf(e.degree)) {
                this.props.formgroups[ 3 ].formElements[ 0 ] = Object.assign({}, this.props.formgroups[ 3 ].formElements[ 0 ], {
                    passProps: {
                        state: 'isDisabled',
                        className: '__select_initial'
                    },
                });
                this.props.formgroups[ 4 ].formElements[ 0 ] = Object.assign({}, this.props.formgroups[ 4 ].formElements[ 0 ], {
                    passProps: {
                        state: 'isDisabled',
                    },
                });
            } else if (e.degree) {
                delete this.props.formgroups[ 3 ].formElements[ 0 ].passProps.state;
                delete this.props.formgroups[ 4 ].formElements[ 0 ].passProps.state;
            }
        };
        window.financialFormOnChange = financialFormOnChange;

        function authApplicationOnChange(e, after) {
            window.refForm.props.setDynamicData('formData', e);
        };
        window.authApplicationOnChange = authApplicationOnChange;

        function applicationOnChange(e, after) {
            window.refForm.props.setDynamicData('formData', e);
        }
        window.applicationOnChange = applicationOnChange;

        function validatePasswordConfirmation(password, element) {
            if (this.state.password !== this.state.password_confirm) {
                this.setState({ formDataErrors: Object.assign({}, this.state.formDataErrors, { password_confirm: [ 'Your confirmation password must match your password.', ], }), });
            } else {
                delete this.state.formDataErrors.password_confirm;
            }
        };
        window.validatePasswordConfirmation = validatePasswordConfirmation;

        function validatePasswordConfirmationReset(password, element) {
            if (this.state.password !== this.state.passwordconfirm) {
                this.setState({ formDataErrors: Object.assign({}, this.state.formDataErrors, { passwordconfirm: [ 'Your confirmation password must match your password.', ], }), });
            } else {
                delete this.state.formDataErrors.passwordconfirm;
            }
        };
        window.validatePasswordConfirmationReset = validatePasswordConfirmationReset;

        function onSuccess(public_token, metadata) {
            window.overlayProps.setUILoadedState(false, {
                "component": "div",
                "children": [ {
                    "component": "p",
                    "props": {
                        "style": {
                            "color": "black",
                            "fontSize": "16px"
                        }
                    },
                    "children": "Processing. Please wait."
                }, {
                    "component": "Button",
                    "props": {
                        "color": "isWhite",
                        "buttonStyle": "isOutlined",
                        "state": "isLoading",
                        "style": {
                            "border": "none"
                        },
                        "children": "Loading"
                    }
                } ]
            });
            let options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'x-access-token': this.props.getState().user.jwt_token
                },
                body: JSON.stringify({ public_token: public_token, metadata: metadata })
            };
            fetch('/thirdparty/psa_plaid', options)
                .then(function () {
                    window.overlayProps.createNotification({ text: 'Successfully Verified Your Bank Account.', timeout: 10000, type: 'success', })
                    window.overlayProps.setUILoadedState(true);
                    window.overlayProps.reduxRouter.goBack();
                });
        }

        function onExit(err, metadata) {
            window.overlayProps.reduxRouter.push('/verification/bank-verification/documents');
        };

        function setScrollOnError() {
            let submitBtn = document.querySelector('.__cis_btn_scroll');
            let currentLocation = window.location.pathname;
            if (submitBtn) {
                submitBtn.addEventListener("click", function () { findError(currentLocation) });
            }
        }
        window.setScrollOnError = setScrollOnError;

        function findError(currentLocation, iteration) {
            let currentIteration = iteration || 0;
            if (currentLocation === window.location.pathname) {
                let error = document.querySelector('.__form_element_has_error');
                if (error) {
                    scrollToElement(error);
                } else {
                    currentIteration++;
                    if (currentIteration < 10) {
                        setTimeout(function () { findError(currentLocation, currentIteration) }, 500);
                    }
                }
            }
        }

        function _getPosition(el) {
            let rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { y: rect.top + scrollTop, x: rect.left + scrollLeft }
        }

        function _getScrollingContainer() {
            if (document.body.scrollTop > document.documentElement.scrollTop) {
                return document.body;
            } else {
                return document.documentElement;
            }
        }



        function scrollToElement(item) {
            let scrollContainer = _getScrollingContainer();
            let scrollToPosition = _getPosition(item).y;
            let from = scrollContainer.scrollTop - 80;
            let by = scrollToPosition - scrollContainer.scrollTop;
            if (from < scrollToPosition) {
                if (scrollToPosition > scrollContainer.scrollHeight - scrollContainer.clientHeight) {
                    by = (scrollContainer.scrollHeight - scrollContainer.clientHeight) - scrollContainer.scrollTop;
                }
            }

            let currentIteration = 0;
            let animIterations = Math.round(60 * 0.5);

            (function scroll() {
                var value = easeOutCubic(currentIteration, from, by, animIterations);
                currentIteration++;
                scrollContainer.scrollTop = value;
                if (currentIteration < animIterations) {
                    requestAnimationFrame(scroll);
                }
            })();
        }
        window.scrollToElement = scrollToElement;


        function easeOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
        }

        window.openHandler = function () {
            let _onSuccess = onSuccess.bind(this);
            let env = window.plaid_settings.env;
            let handler = Plaid.create({
                apiVersion: 'v2',
                clientName: window.plaid_settings.client_name,
                env,
                key: window.plaid_settings.public_key,
                product: [ 'auth', 'transactions', ],
                selectAccount: false,
                onLoad: function () {
                },
                onSuccess: _onSuccess,
                onExit: onExit
            });
            handler.open();
        };

        window.printWindow = function (divId) {
            let printContents = document.getElementById(divId).innerHTML;
            printContents = printContents.replace(/Print This Page/g, '');
            let popupWin = window.open(window.location.href, '_blank');
            popupWin.document.open()
            popupWin.document.write('<html><head></head><body onload="window.print()">' + printContents + '</html>');
            popupWin.document.close();
            popupWin.focus();
        }
        window.redirectLogin = function () {
            this.props.reduxRouter.push('/login?return_url=/account');
        };

        window.addRef = function (form) {
            window.refForm = form;
        }

        let stateCustomOnChange = function (stateName) {
            if (window.refForm.state[ stateName ] === 'DE') {
                let state_specific_form_element = document.querySelectorAll('.state_specific_form_element');
                for (let i = 0; i < state_specific_form_element.length; i++) {
                    state_specific_form_element[ i ].classList.add('hideStateField');
                }
                let DE_elements = document.querySelectorAll('.state_specific_form_element.state_level_one.state_DE');

                for (let j = 0; j < DE_elements.length; j++) {
                    DE_elements[ j ].classList.remove('hideStateField');
                }
            } else if (window.refForm.state[ stateName ] === 'WI') {
                let state_specific_form_element = document.querySelectorAll('.state_specific_form_element');
                for (let i = 0; i < state_specific_form_element.length; i++) {
                    state_specific_form_element[ i ].classList.add('hideStateField');
                }
                let WI_elements = document.querySelectorAll('.state_specific_form_element.state_level_one.state_WI');
                for (let j = 0; j < WI_elements.length; j++) {
                    WI_elements[ j ].classList.remove('hideStateField');
                }
            } else {
                let state_specific_form_element = document.querySelectorAll('.state_specific_form_element');
                for (let i = 0; i < state_specific_form_element.length; i++) {
                    state_specific_form_element[ i ].classList.add('hideStateField');
                }
            }
        }

        window.stateCustomOnChange = stateCustomOnChange;

        let maritalOnChange = function (element) {
            let maritalElements = document.querySelectorAll('.state_specific_form_element.state_level_two.state_WI');
            if (window.refForm.state[ element.name ] === 'Married') {
                for (let i = 0; i < maritalElements.length; i++) {
                    maritalElements[ i ].classList.remove('hideStateField');
                }
            } else {
                for (let i = 0; i < maritalElements.length; i++) {
                    maritalElements[ i ].classList.add('hideStateField');
                }
            }
        };

        window.maritalOnChange = maritalOnChange;

        function nameOnChange(evt, ele) {
            if (window.refForm.state.fname && window.refForm.state.fname.length >= 30) {
                ele.validateOnKeyup = true;
                window.refForm.setState({ fname: window.refForm.state.fname.slice(0, 30) });
            }
            if (window.refForm.state.lname && window.refForm.state.lname.length >= 30) {
                ele.validateOnKeyup = true;
                window.refForm.setState({ lname: window.refForm.state.lname.slice(0, 30) });
            }
        }

        window.nameOnChange = nameOnChange;


        let checkApplicantState = function () {
            if (window.refForm) {
                let relevant_states = [ 'DE', 'WI' ];
                if (relevant_states.indexOf(window.refForm.state.address_state) !== -1) {
                    window.stateCustomOnChange('address_state');
                }
            }
        }

        window.checkApplicantState = checkApplicantState;

        let selectOnChange = function (element, event) {
            element.passProps = element.passProps || {};
            if (element.passProps.className) {
                element.passProps.className = element.passProps.className.replace(/__select_initial/i, '');
            }
            window.refForm.setState({ [ element.name ]: event.target.value }, function () {
                window.refForm.validateFormElement.call(window.refForm, { formElement: element });
                if (element.name === 'address_state') {
                    window.stateCustomOnChange.call(this, element.name);
                }
                if (element.name === 'marital_status') {
                    window.maritalOnChange.call(this, element);
                }
            })
        }
        window.selectOnChange = selectOnChange;

        window.parseQueryParams = function () {
            if (typeof window.location.search === 'string' && window.location.search.length) {
                let queryparams = window.location.search.substring(1).split('&').reduce(function (result, param) {
                    let key = param.substring(0, param.indexOf('='));
                    let value = param.substring(param.indexOf('=') + 1);
                    result[ key ] = value;
                    return result;
                }, {});
                this.props.setDynamicData('querydata', queryparams);
            }
        };
        function setToResponsiveForm(layout, cb) {
            let form = (function find(children) {
                let _form;
                if (Array.isArray(children)) {
                    for (let i = 0; i < children.length; i++) {
                        if (!_form) {
                            if (children[ i ] === 'ResponsiveForm') _form = children[ i ];
                            else if (children[ i ].component === 'ResponsiveForm') _form = children[ i ];
                            else if (children[ i ].children) _form = find(children[ i ].children);
                        }
                        if (_form) return _form;
                    }
                }
            })(layout.children);
            if (typeof cb === 'function') return cb(layout, form);
            return layout;
        };
        window.appendSourceTrackingFields = function (res) {
            let pathname = window.location.pathname;
            if (!res || (res && !res.hiddenfields)) {
                let state = this.props.getState();
                let manifests = state.manifest.containers;
                let container = manifests[ pathname ] || manifests[ '/application/form' ];
                let querydata = (state.dynamic && state.dynamic.querydata) ? Object.assign({}, state.dynamic.querydata) : false;
                if (querydata) {
                    let layout = setToResponsiveForm(container.layout, function (layout, form) {
                        form.props = form.props || {};
                        form.props.hiddenFields.splice.apply(form.props.hiddenFields, [ form.props.hiddenFields.length - 1, 0 ].concat(Object.keys(querydata).map(function (key) {
                            return {
                                form_name: key,
                                form_static_val: querydata[ key ]
                            };
                        })));
                        return layout;
                    });
                    container = Object.assign({}, container, { layout: layout });
                    this.setState(state);
                }
            } else {
                let state = this.props.getState();
                let querydata = (state.dynamic && state.dynamic.querydata) ? Object.assign({}, state.dynamic.querydata) : false;
                if (querydata) {
                    let hiddenfields = res.hiddenfields;
                    hiddenfields.splice.apply(hiddenfields, [ hiddenfields.length - 1, 0 ].concat(Object.keys(querydata).map(function (key) {
                        return {
                            form_name: key,
                            form_static_val: querydata[ key ]
                        };
                    })));
                    res.hiddenfields = hiddenfields;
                }
            }
            return res;
        };

        function testMaskDollarInput(rawValue) {
            return {
                prefix: '$',
                suffix: '', // This will put the dollar sign at the end, with a space.
                integerLimit: 7,
            };
        }
        window.testMaskDollarInput = testMaskDollarInput;

        function testMaskPercentageInput(rawValue) {
            return {
                prefix: '',
                decimalLimit: 2,
                suffix: '%', // This will put the dollar sign at the end, with a space.
                allowDecimal: true,
                integerLimit: 7,
            };
        }
        window.testMaskPercentageInput = testMaskPercentageInput;

        function SSNFormatter(e, element) {
            return [ /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ];
        };
        window.SSNFormatter = SSNFormatter;

        function phoneNumberFormatter() {
            return [ '(', /[1-9]/, /\d/, /\d/, ')', '\u2000', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ];
        }
        window.phoneNumberFormatter = phoneNumberFormatter;

        function preventApplicantAccess(e) {
            if (e.type === 'preventApplicantAccess') {
                let page;
                switch (e.status) {
                    case 'offers_available': page = `/offers/${e.product}/available`; break;
                    case 'offer_selected': page = `/offers/${e.product}/accept`; break;
                    case 'completing_application': page = `/verification/${e.product}`; break;
                }
                window.overlayProps.createNotification({ text: e.text, timeout: 10000, type: 'error', })
                window.overlayProps.reduxRouter.push(page);
            } else {
                return null;
            }
        }

        window.preventApplicantAccess = preventApplicantAccess;

        (function favicon() {
            document.head.querySelector("link").href = window.client_configurations.company_favicon;
        })()

        function productSelectionSelection() {
            if (document.getElementById('36months')) document.getElementById('36months').click();
            else document.querySelector('input').click();
        }

        window.productSelectionSelection = productSelectionSelection;

        function setHeaders() {
            window.overlayProps.settings.userprofile.options.headers[ 'Content-Type' ] = 'application/json';
        }

        window.setHeaders = setHeaders;

        var formatSSN = function (e, element) {
            let currentVal = e.target.value.replace(/\D/gi, '');
            let second = currentVal.substring(3, 5);
            let third = currentVal.substring(5, 9);
            currentVal = currentVal.substring(0, 3);
            if (third) {
                currentVal = `${currentVal}-${second}-${third}`;
            } else if (second) {
                currentVal = `${currentVal}-${second}`;
            }
            this.setState({ 'ssn': currentVal, });
        };
        window.formatSSN = formatSSN;

        function closeModalAndCreateNotification(obj) {
            this.props.hideModal('last');
            this.props.createNotification(obj);
        }
        window.closeModalAndCreateNotification = closeModalAndCreateNotification;

        const validateInterval = value => {
            if (!value) return null;
            try {
                cronstrue.toString(value);
                return null;
            } catch (err) {
                return err;
            }
        };
        window.validateInterval = validateInterval;

        const populateIntervalDescription = event => {
            try {
                const interval = event.target.value;
                const interval_description = document.getElementsByClassName('__cron_interval_description')[ 0 ];
                const input = interval_description.firstElementChild
                if (!interval) {
                    input.value = ''
                    return
                }
                const expression = cronstrue.toString(interval)
                input.value = expression
            } catch (err) {
                return err
            }
        };
        window.populateIntervalDescription = populateIntervalDescription;
    }
}