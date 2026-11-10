# המנטור האישי לפייתון

זהו פרויקט React + Vite המבוסס על הקוד המקורי שסופק. הוא כולל את קובצי ההפעלה, עיצוב Tailwind CSS ותהליך פרסום אוטומטי ל-GitHub Pages.

## העלאה ל-GitHub

1. צרו Repository חדש ב-GitHub.
2. העלו את כל התוכן שבתיקייה הזו (לא רק את `App.jsx`) לשורש ה-Repository.
3. ודאו ששם הענף הראשי הוא `main`. אם הענף נקרא `master`, שנו את `branches: [main]` בקובץ `.github/workflows/deploy.yml` ל-`branches: [master]`.
4. היכנסו ל-Settings → Pages.
5. תחת Build and deployment, בחרו Source: **GitHub Actions**.
6. היכנסו ללשונית Actions וודאו שהריצה בשם “Deploy website to GitHub Pages” הסתיימה בהצלחה.
7. חזרו ל-Settings → Pages ופתחו את כתובת האתר שמופיעה שם.

## הרצה מקומית (אופציונלי)

נדרשת התקנת Node.js. מתוך תיקיית הפרויקט הריצו:

```bash
npm install
npm run dev
```

כדי לבדוק את גרסת הפרסום:

```bash
npm run build
npm run preview
```

## מבנה הפרויקט

- `src/App.jsx` — קוד האפליקציה המקורי.
- `src/main.jsx` — נקודת הכניסה של React.
- `src/index.css` — טעינת Tailwind CSS וסגנונות בסיסיים.
- `index.html` — מסמך ה-HTML שמכיל את `#root`.
- `vite.config.js` — הגדרות Vite ונתיבים יחסיים ל-GitHub Pages.
- `.github/workflows/deploy.yml` — בנייה ופרסום אוטומטיים.
