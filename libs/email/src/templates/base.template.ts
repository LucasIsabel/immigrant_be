export function wrapInBaseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ImmigrantMatch</title>
  <style>
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .email-content { padding: 24px 16px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;min-height:100vh;">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header with gradient -->
          <tr>
            <td style="background:linear-gradient(135deg,#1d4ed8 0%,#2563eb 50%,#3b82f6 100%);padding:32px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="vertical-align:middle;padding-right:10px;">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="18" cy="18" r="18" fill="rgba(255,255,255,0.2)"/>
                      <path d="M10 18L16 24L26 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">ImmigrantMatch</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td class="email-content" style="padding:40px 40px 32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px;background-color:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0 0 10px;color:#64748b;font-size:13px;line-height:1.5;">
                <a href="https://immigrantmatch.com" style="color:#2563eb;text-decoration:none;font-weight:500;">Website</a>
                &nbsp;&bull;&nbsp;
                <a href="mailto:support@immigrantmatch.com" style="color:#2563eb;text-decoration:none;font-weight:500;">Support</a>
              </p>
              <p style="margin:0;color:#94a3b8;font-size:12px;">&copy; ${new Date().getFullYear()} ImmigrantMatch. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
