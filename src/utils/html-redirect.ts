
export function getRedirectHtml(redirectUrl: string) {
    return `
        <title>Redirect...</title>
        <script>
            window.location.replace("${redirectUrl}");    
        </script>
    `;
}