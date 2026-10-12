const isAndroidChrome =
    /Android/i.test(navigator.userAgent) &&
    /Chrome/i.test(navigator.userAgent) &&
    !/Edg|OPR|SamsungBrowser/i.test(navigator.userAgent);

if (isAndroidChrome) {
    document.querySelectorAll(".social-link[data-android-package]").forEach((link) => {
        link.addEventListener("click", (event) => {
            const profileUrl = new URL(link.href);
            const packageName = link.dataset.androidPackage;
            const intentUrl =
                `intent://${profileUrl.host}${profileUrl.pathname}${profileUrl.search}` +
                `#Intent;scheme=${profileUrl.protocol.slice(0, -1)}` +
                `;package=${packageName}` +
                `;S.browser_fallback_url=${encodeURIComponent(profileUrl.href)};end`;

            event.preventDefault();
            window.location.href = intentUrl;
        });
    });

    document.querySelectorAll(".social-link[data-android-email-app]").forEach((link) => {
        link.addEventListener("click", (event) => {
            const emailUrl = new URL(link.href);
            const recipient = emailUrl.pathname;
            const fallbackUrl = new URL("https://mail.google.com/mail/");
            fallbackUrl.searchParams.set("view", "cm");
            fallbackUrl.searchParams.set("fs", "1");
            fallbackUrl.searchParams.set("to", recipient);

            event.preventDefault();
            window.location.href =
                `intent://${recipient}#Intent;scheme=mailto` +
                `;package=${link.dataset.androidEmailApp}` +
                `;S.browser_fallback_url=${encodeURIComponent(fallbackUrl.href)};end`;
        });
    });
}
