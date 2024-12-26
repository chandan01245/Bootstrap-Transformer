const converter = new BootstrapConverter();
    // Initialize CodeMirror editors
const inputEditor = CodeMirror.fromTextArea(document.getElementById('input-editor'), {
    mode: 'xml',
    lineNumbers: true,
    theme: 'dracula',
    lineWrapping: true,
    autoCloseTags: true,
    viewportMargin: Infinity
});
const outputEditor = CodeMirror.fromTextArea(document.getElementById('output-editor'), {
    mode: 'xml',
    lineNumbers: true,
    theme: 'dracula',
    lineWrapping: true,
    readOnly: true,
    viewportMargin: Infinity

});
const convertBtn = document.getElementById('convert-btn');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const errorAlert = document.getElementById('error-alert');
const errorMessage = document.getElementById('error-message');
const fontSelector = document.getElementById('font-selector');
const previewFrame = document.getElementById('preview-frame');
    // Refresh editors when switching tabs
const outputTabs = document.querySelectorAll('a[data-bs-toggle="tab"]');
outputTabs.forEach(tab => {
    tab.addEventListener('shown.bs.tab', (e) => {
        if (e.target.id === 'output-code-tab') {
            outputEditor.refresh();
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    inputEditor.refresh();
    outputEditor.refresh();
});

// Event handlers
convertBtn.addEventListener('click', async () => {
    try {
        convertBtn.classList.add('loading');
        convertBtn.textContent = 'Converting...';
        const inputHtml = inputEditor.getValue().trim();

        if (!inputHtml) {
            throw new Error('Please enter HTML code to convert');
        }

        const convertedHtml = converter.convert(inputHtml);
        outputEditor.setValue(convertedHtml);
        previewFrame.srcdoc = convertedHtml;
        document.getElementById('output-preview-tab').click(); // Switch to preview tab
    } catch (error) {
        errorMessage.textContent = error.message;
        errorAlert.style.display = 'block';
    } finally {
        convertBtn.classList.remove('loading');
        convertBtn.textContent = 'Convert';
    }
});

copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputEditor.getValue());
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    } catch (error) {
        errorMessage.textContent = 'Failed to copy to clipboard';
        errorAlert.style.display = 'block';
    }
});

clearBtn.addEventListener('click', () => {
    inputEditor.setValue('');
    outputEditor.setValue('');
    previewFrame.srcdoc = '';
    document.getElementById('output-code-tab').click(); // Switch to code tab
    errorAlert.style.display = 'none';
});

fontSelector.addEventListener('change', () => {
    if (outputEditor.getValue()) {
        convertBtn.click();
    }
});
