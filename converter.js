class BootstrapConverter {
    constructor() {
        this.styleToBootstrapMap = {
            'text-align: center': 'text-center',
            'margin-bottom': 'mb-3',
            'margin-top': 'mt-3',
            'padding': 'p-3',
            'display: flex': 'd-flex',
            'justify-content': 'justify-content-center',
            'align-items: center': 'align-items-center',
            'margin-left': 'ms-3',
            'margin-right': 'me-3',
            'padding-left': 'ps-3',
            'padding-right': 'pe-3',
            'padding-top': 'pt-3',
            'padding-bottom': 'pb-3',
            'display: block': 'd-block',
            'display: inline-block': 'd-inline-block',
            'display: none': 'd-none',
            'float: left': 'float-start',
            'float: right': 'float-end',
            'font-weight: bold': 'fw-bold',
            'font-weight: bolder': 'fw-bolder',
            'font-weight: normal': 'fw-normal',
            'font-weight: light': 'fw-light',
            'font-style: italic': 'fst-italic',
            'font-style: normal': 'fst-normal',
            'text-decoration: underline': 'text-decoration-underline',
            'text-decoration: line-through': 'text-decoration-line-through',
            'text-decoration: none': 'text-decoration-none',
            'text-transform: uppercase': 'text-uppercase',
            'text-transform: lowercase': 'text-lowercase',
            'text-transform: capitalize': 'text-capitalize',
            'background-color: primary': 'bg-primary',
            'background-color: secondary': 'bg-secondary',
            'background-color: success': 'bg-success',
            'background-color: danger': 'bg-danger',
            'background-color: warning': 'bg-warning',
            'background-color: info': 'bg-info',
            'background-color: light': 'bg-light',
            'background-color: dark': 'bg-dark',
            'color: primary': 'text-primary',
            'color: secondary': 'text-secondary',
            'color: success': 'text-success',
            'color: danger': 'text-danger',
            'color: warning': 'text-warning',
            'color: info': 'text-info',
            'color: light': 'text-light',
            'color: dark': 'text-dark',
            'color: muted': 'text-muted',
            'color: white': 'text-white',
            'color: black': 'text-black',
        };

        this.conversionRules = {
            'header': (element) => {
                element.classList.add('bg-dark', 'text-white', 'text-center', 'py-3');
            },
            // Typography
            'h1,h2,h3,h4,h5,h6': (element) => {
                element.classList.add('text-left','mb-4');
            },
            // Paragraph tags
            'p': (element) => {
                if (element.textContent.length > 100) {
                    element.classList.add('lead');
                }
            },
            // Anchor tags
            'a': (element) => {
                element.classList.add('text-decoration-none', 'text-primary');
            },
            // Strong tags
            'strong': (element) => {
                element.classList.add('fw-bold');
            },
            // Small tags
            'small': (element) => {
                element.classList.add('text-muted');
            },
            // Forms
            'form': (element) => {
                element.classList.add('needs-validation','p-4','rounded-3');
                element.setAttribute('novalidate', '');
                if (!element.classList.contains('row')) {
                    element.classList.add('row'); // Ensure form is using Bootstrap grid system
                }
                this.convertFormGroups(element);
            },
            // Input tags
            'input[type="text"], input[type="email"], input[type="password"], input[type="number"], input[type="search"]': (element) => {
                element.classList.add('form-control', 'rounded-0', 'mb-3', 'me-3', 'p-2');
                const label = element.previousElementSibling;
                if (label && label.tagName.toLowerCase() === 'label') {
                    element.setAttribute('placeholder', label.textContent);
                    label.remove();
                }
            },
            // Textarea and select tags
            'textarea': (element) => {
                element.classList.add('form-control', 'rounded-0', 'mb-3', 'me-3', 'p-2');
                const label = element.previousElementSibling;
                if (label && label.tagName.toLowerCase() === 'label') {
                    element.setAttribute('placeholder', label.textContent);
                    label.remove();
                }
            },
            'select': (element) => {
                element.classList.add('form-select', 'rounded-0', 'mb-3', 'me-3', 'p-2');
                const label = element.previousElementSibling;
                if (label && label.tagName.toLowerCase() === 'label') {
                    element.setAttribute('placeholder', label.textContent);
                    label.remove();
                }
            },
            // Label tags
            'label': (element) => {
                element.classList.add('form-label', 'col-form-label'); // Added col-form-label for better alignment in grid
            },
            // Checkbox and radio inputs
            'input[type="checkbox"], input[type="radio"]': (element) => {
                const label = element.nextElementSibling;
                if (label && label.tagName.toLowerCase() === 'label') {
                    label.classList.add('form-check-label');
                    label.style.padding = '0'; // Remove padding between label and input
                }
                element.classList.add('form-check-input', 'mb-3');
            },
            // Buttons
            'button, input[type="submit"], input[type="button"]': (element) => {
                element.classList.add('btn', 'btn-primary', 'rounded-pill', 'mb-3', 'me-3', 'p-2');
                if (element.closest('form')) {
                    element.classList.add('w-100');
                }
            },
            // Images and media
            'img': (element) => {
                element.classList.add('img-fluid');
                if (element.parentElement.tagName === 'FIGURE') {
                    element.classList.add('figure-img');
                }
            },
            'audio': (element) => {
                element.classList.add('w-60', 'mb-3');
                element.setAttribute('controls', ''); // Make audio element full width and add bottom margin
            },
            // Video tags
            'video': (element) => {
                element.classList.add('w-60', 'mb-3'); // Make video element full width and add bottom margin
                element.setAttribute('controls', ''); // Ensure video controls are enabled
            },
            'caption': (element) => {
                element.classList.add('caption-top', 'text-center', 'mb-3');
            },
            // Lists
            'ul': (element) => {
                if (!element.closest('nav')) {
                    element.classList.add('list-group');
                    Array.from(element.children).forEach(li => {
                        li.classList.add('list-group-item');
                    });
                }
            },
            'ol': (element) => {
                element.classList.add('list-group');
                Array.from(element.children).forEach(li => {
                    li.classList.add('list-group-item');
                });
            },
            // Tables
            'table': (element) => {
                element.classList.add('table', 'table-striped', 'table-hover','table-bordered','my-4','mx-auto');
                const wrapper = document.createElement('div');
                wrapper.classList.add('table-responsive', 'mx-4','px-4');
                element.parentNode.insertBefore(wrapper, element);
                wrapper.appendChild(element);

                const thead = element.querySelector('thead');
                if (thead) {
                    thead.classList.add('table-dark');
                    Array.from(thead.rows[0].cells).forEach(cell => {
                        cell.classList.add('sticky-top');
                    });
                }
            },
            // Navigation
            'nav': (element) => {
                element.classList.add('navbar', 'navbar-expand-lg', 'navbar-light','bg-dark');
                element.style.zIndex = '1020';
                const ul = element.querySelector('ul');
                if (ul) {
                    ul.classList.add('navbar-nav');
                    Array.from(ul.children).forEach(li => {
                        li.classList.add('nav-item');
                        const a = li.querySelector('a');
                        if (a) {
                            a.classList.add('nav-link','text-white');
                        }
                    });
                }
            },
            'main': (element) => {
                element.classList.add('container', 'p-4', 'm-2', 'rounded-3'); // Added Bootstrap classes directly to <main>
            },
            'section': (element) => {
                element.classList.add('container', 'p-2', 'm-2', 'rounded-3'); // Added Bootstrap classes directly to <section>
            },
            // Footer
            'footer': (element) => {
                element.classList.add('footer', 'py-3', 'rounded-0');
                element.style.position = 'relative';
                // Adjust footer background based on text color
                const textColor = window.getComputedStyle(element).color;
                if (textColor) {
                    if (this.isLightColor(textColor)) {
                        element.classList.add('bg-white');
                        element.classList.remove('text-white');
                    } else {
                        element.classList.add('bg-dark', 'text-white');
                    }
                }
            },
            // Grid system
            'div.row': (element) => {
                element.classList.add('row');
            },
            'div[class*="col-"]': (element) => {
                const colClass = Array.from(element.classList).find(cls => cls.startsWith('col-'));
                if (colClass) {
                    element.classList.add(colClass);
                }
            }
        };
    }

    isLightColor(color) {
        const rgb = color.match(/\d+/g);
        const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
        return luminance > 186;
    }

    convertFormGroups(form) {
        const divs = form.querySelectorAll('div');
        divs.forEach(div => {
            const label = div.querySelector('label');
            const input = div.querySelector('input, textarea, select');
            if (label && input && input.type !== 'checkbox' && input.type !== 'radio') {
                // Remove the label and add its text as placeholder
                input.setAttribute('placeholder', label.textContent);
                label.remove(); // Ensure label uses correct column width
            } else if (label && input) {
                const wrapper = document.createElement('div');
                wrapper.classList.add('mb-3', 'row', 'p-2'); // Use row for form groups and add padding
                div.parentNode.insertBefore(wrapper, div);
                wrapper.appendChild(div);
                
                div.classList.add('col-md-8'); // Default column width for inputs
                label.classList.add('col-md-4', 'col-form-label');
            }
        });
    }

    convertContainer(element) {
        if (!element.closest('.container') && element.tagName !== 'BODY') {
            const container = document.createElement('div');
            container.className = 'container p-4 m-4 rounded-3';
            element.parentNode.insertBefore(container, element);
            container.appendChild(element);
        }
    }
    wrapHeaderNavInContainer(body) {
        const header = body.querySelector('header');
        const nav = body.querySelector('nav');

        if (header && nav) {
            const container = document.createElement('div');
            container.classList.add('container', 'sticky-top');
            header.parentNode.insertBefore(container, header);
            container.appendChild(header);
            container.appendChild(nav);
        } else if (header) {
            const container = document.createElement('div');
            container.classList.add('container', 'sticky-top');
            header.parentNode.insertBefore(container, header);
            container.appendChild(header);
        } else if (nav) {
            const container = document.createElement('div');
            container.classList.add('container', 'sticky-top');
            nav.parentNode.insertBefore(container, nav);
            container.appendChild(nav);
        }
    }

    convertInlineStyles(element) {
        if (element.hasAttribute('style')) {
            const style = element.getAttribute('style');
            const styleRules = style.split(';').map(rule => rule.trim()).filter(rule => rule.length > 0);

            styleRules.forEach(rule => {
                const [property, value] = rule.split(':').map(part => part.trim());
                const cssRule = `${property}: ${value}`;

                // Apply Bootstrap class if available in the map
                if (this.styleToBootstrapMap[cssRule]) {
                    element.classList.add(this.styleToBootstrapMap[cssRule]);
                }
            });

            // Remove the inline style attribute
            element.removeAttribute('style');
        }
    }

    formatHTML(html) {
        let formatted = '';
        let indent = '';

        // Split on closing tags
        html = html.replace(/>\s*</g, '>\n<');

        // Split on opening tags
        html = html.replace(/(<[^\/].*?>)/g, '\n$1');

        const lines = html.split('\n').filter(line => line.trim() !== '');

        lines.forEach(line => {
            // Decrease indent for closing tags
            if (line.match(/<\/\w/)) {
                indent = indent.substring(2);
            }

            // Add the line with proper indentation
            formatted += indent + line + '\n';

            // Increase indent for opening tags
            if (line.match(/<\w[^>]*[^\/]>$/)) {
                indent += '  ';
            }
        });

        return formatted;
    }

    convert(htmlString) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');

            // Process all elements
            const processElement = (element) => {
                this.convertInlineStyles(element);
                for (const [selector, rule] of Object.entries(this.conversionRules)) {
                    if (element.matches(selector)) {
                        rule(element);
                    }
                }
                Array.from(element.children).forEach(processElement);
            };

            const body = doc.body;
            this.convertContainer(body);
            processElement(body);

            // Add Bootstrap dependencies and selected font
            const head = doc.head;
            const fontFamily = document.getElementById('font-selector').value;

            // Add font style
            const styleElement = doc.createElement('style');
            styleElement.textContent = `body { font-family: ${fontFamily}; }`;
            head.appendChild(styleElement);

            // Add Bootstrap if not present
            if (!head.querySelector('link[href*="bootstrap"]')) {
                const bootstrapCSS = document.createElement('link');
                bootstrapCSS.rel = 'stylesheet';
                bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
                head.appendChild(bootstrapCSS);
            }

            // Ensure the doctype is included
            const doctype = '<!DOCTYPE html>\n';

            // Format the HTML before returning
            return doctype + this.formatHTML(doc.documentElement.outerHTML);
        } catch (error) {
            throw new Error(`Conversion failed: ${error.message}`);
        }
    }
}