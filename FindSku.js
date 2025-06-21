javascript: void(function() {
    function copyToClipboard(text) {
        const textarea = document.createElement("textarea");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }

    function showOverlay(skuMap) {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = "1000";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";

        const content = document.createElement("div");
        content.style.backgroundColor = "#fff";
        content.style.padding = "20px";
        content.style.borderRadius = "5px";
        content.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
        content.style.maxHeight = "80%";
        content.style.overflowY = "auto";
        content.style.position = "relative";

        const title = document.createElement("h1");
        title.style.fontWeight = "bold";
        title.textContent = "FindSKU";
        content.appendChild(title);

        const subtitle = document.createElement("h2");
        subtitle.textContent = "I've found the following ILCs for you:";
        content.appendChild(subtitle);

        const description = document.createElement("p");
        description.textContent = "Click one of the products to copy the ILC to clipboard.";
        content.appendChild(description);

        skuMap.forEach((productName, sku) => {
            const entry = document.createElement("div");
            entry.style.padding = "10px";
            entry.style.borderBottom = "1px solid #ddd";
            entry.style.cursor = "pointer";
            entry.textContent = `ILC: ${sku}, Product Name: ${productName}`;
            entry.addEventListener("click", () => {
                copyToClipboard(sku);
                alert(`Copied SKU: ${sku} to clipboard`);
            });
            content.appendChild(entry);
        });

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.style.marginTop = "20px";
        closeButton.addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
        content.appendChild(closeButton);

        const footer = document.createElement("div");
        footer.style.position = "absolute";
        footer.style.bottom = "10px";
        footer.style.right = "10px";
        footer.style.fontSize = "12px";
        footer.style.color = "#888";
        footer.innerHTML = `FindSku - JS ILC Scan, Petbarn.`;
        content.appendChild(footer);

        overlay.appendChild(content);
        document.body.appendChild(overlay);
    }

    (function() {
        const productDataRegex = /"sku":"(\d+)","name":"(.*?)"/g;
        const htmlContent = document.documentElement.innerHTML;

        let match;
        let skuMap = new Map();

        while ((match = productDataRegex.exec(htmlContent)) !== null) {
            skuMap.set(match[1], match[2]);
        }

        if (skuMap.size > 0) {
            showOverlay(skuMap);
        } else {
            alert("ILCs or Product Names not found");
        }
    })();
})();
