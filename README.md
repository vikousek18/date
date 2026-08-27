# 💗 Ivanka Date Website

A cute one-page date invitation designed for GitHub Pages.

## What it does

1. Home page asks: "Ivanka, would you like to have a date with me?"
2. The "No" button runs away when hovered/tapped.
3. "Yes" opens four date types:
   - Apartment
   - Đạp vịt
   - Ăn gà
   - Ăn nhà hàng
4. Ivanka chooses a date + time.
5. The final screen shows the chosen plan and a photo wall.
6. The selection can be sent to you by email through Google Apps Script.

## Add your photos

Put your photos in `assets/` and name them:

- photo1.jpg
- photo2.jpg
- ...
- photo20.jpg

You can use fewer than 20. Missing photos are automatically hidden.

If your photos are PNG/WEBP, change `.jpg` in `script.js` to the correct extension.

## Make the selection arrive in your email

GitHub Pages cannot directly run a private server, so this project uses Google Apps Script as a tiny free backend.

1. Open https://script.google.com/
2. Create a new project.
3. Paste `google-apps-script.gs`.
4. Change:
   `const YOUR_EMAIL = "YOUR_EMAIL_HERE";`
   to your email.
5. Deploy it as a Web app:
   - Execute as: Me
   - Who has access: Anyone
6. Copy the Web App `/exec` URL.
7. Open `config.js` and put the URL into:
   `APPS_SCRIPT_URL: "YOUR_URL"`
8. Upload everything to a GitHub repository.
9. Enable GitHub Pages:
   Settings → Pages → Deploy from branch → main → / (root).

## Important

The photos are kept in the GitHub repository, so don't upload anything you wouldn't want publicly accessible.

The backend only receives the selected date type, date, time and submission timestamp. It does not receive the photos.

## Easy customization

- Change text in `index.html`
- Change colors/layout in `style.css`
- Change the 4 date choices in `index.html`
- Change the number of photo slots in `script.js`
