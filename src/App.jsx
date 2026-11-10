import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Code, Play, CheckCircle2, HelpCircle, 
  ArrowLeft, ArrowRight, RotateCcw, Lightbulb, 
  Layers, Compass, Award, Terminal, Eye, AlertTriangle,
  Sparkles, ChevronDown, ChevronUp, Check, X, ShieldAlert,
  Cpu, ListChecks, Footprints, Flame, HeartHandshake
} from 'lucide-react';

// ==========================================
// DATA: COURSE LESSONS & STEP-BY-STEP EXERCISES
// ==========================================

const LESSONS_DATA = [
  {
    id: 1,
    title: "שיעור 1: רכיבי יסוד (קלט, עיבוד, פלט)",
    subtitle: "משתנים, המרות טיפוסים (int/float), חילוק שלם (//) ושארית (%)",
    icon: "🧱",
    color: "indigo",
    analogyTitle: "אנלוגיית הקופסה והמתכון",
    analogyText: "תוכנית מחשב בתחילת הדרך היא כמו מתכון בישול פשוט: שלב 1 הוא להביא את המצרכים מהמשתמש (Input), שלב 2 הוא לבשל ולחשב בקערות עם מדבקות שמות (Variables & Processing), ושלב 3 הוא להגיש את המנה לצלחת (Output עם print). זכרו: הפונקציה input תמיד מביאה 'קופסת טקסט' (str), ואם רוצים לעשות איתה חשבון, חייבים לקלף ממנה את המרכאות בעזרת int או float!",
    goldenRules: [
      { title: "input תמיד מחזירה מחרוזת (str)", desc: "גם אם המשתמש הקליד 83, פייתון רואה '83' (טקסט). כדי לחבר או להכפיל, חובה לעטוף ב-int() לשלם או ב-float() לעשרוני." },
      { title: "השמה (=) נקראת מימין לשמאל", desc: "x = x + 1 זו לא משוואה במתמטיקה! קודם מחשבים את צד ימין (הערך הישן של x פלוס 1), ואז מדביקים עליו את התווית x." },
      { title: "צמד הקסם: מנה (//) ושארית (%)", desc: "כיתה ד' חוזרת ובגדול! // עונה על 'כמה פעמים שלמות נכנס?' (למשל שעות שלמות בדקות, או ספרת עשרות בדו-ספרתי: num // 10), ו-% עונה על 'מה נשאר בעודף?' (למשל ספרת אחדות: num % 10 או בדיקת זוגיות)." },
      { title: "כלליות (בלי מספרים קסומים)", desc: "עופר מדגיש: אם יש מחיר קבוע (כמו 10 ש\"ח לספר), נשמור אותו במשתנה price = 10 כדי שיהיה קל לעדכן את התוכנית בעתיד." }
    ],
    exercises: [
      {
        id: "ex1_1",
        title: "בוטיק השוקולדים של מטילדה",
        difficulty: "בסיסי - בניית שלד קלט-עיבוד-פלט",
        story: "מטילדה טועמת 3 קוביות שוקולד בבוטיק 'מריר' (המחיר של כל קוביה עשוי להיות עשרוני ואינו אחיד). בנוסף, המחשב מגריל עבורה תו קנייה (קופון הנחה) שלם בין 10 ל-20 ש\"ח (כולל). כתבו תוכנית הקולטת את 3 המחירים, מגרילה קופון, ומדפיסה את הסכום הסופי לתשלום.",
        stage1: {
          questionInput: "מהם הנתונים שאנחנו חייבים לקלוט מהמשתמשת (מטילדה), ומה הסוג שלהם?",
          optionsInput: [
            { id: "a", text: "3 מחירים (מספרים עשרוניים - float) ואת שווי הקופון (מספר שלם - int)", correct: false, feedback: "שים לב! את הקופון המשתמשת לא מקלידה, אלא התוכנית מגרילה בעצמה בעזרת random." },
            { id: "b", text: "רק את 3 מחירי הקוביות, ויש להמיר כל אחד מהם ל-float", correct: true, feedback: "מדויק! מטילדה מזינה 3 מחירים שעשויים להכיל אגורות (למשל 7.5), לכן נקלוט עם input ונמיר מיד ל-float." },
            { id: "c", text: "3 מחירים כמחרוזת (str) בלי המרה, ונחבר ביניהם", correct: false, feedback: "זהירות! חיבור מחרוזות ('2' + '3') משרשר אותן ל-'23' במקום לחשב 5." }
          ],
          questionPattern: "איך נגריל את תו הקנייה בין 10 ל-20 כולל?",
          optionsPattern: [
            { id: "p1", text: "נייבא את המודול random בראש התוכנית, ונשתמש ב-random.randint(10, 20)", correct: true, feedback: "מעולה! randint היא הפונקציה שמגרילה מספר שלם בטווח שכולל גם את הגבול התחתון (10) וגם את העליון (20)." },
            { id: "p2", text: "נשתמש בפונקציה המובנית randint(10, 20) בלי import", correct: false, feedback: "randint אינה פונקציה מובנית (Built-in) כמו print. חייבים לייבא את המודול random ולכתוב random.randint." }
          ]
        },
        stage2: [
          { stepTitle: "ייבוא כלי ההגרלה", explanation: "בראש התוכנית נבקש מפייתון לטעון את ארגז הכלים של המספרים האקראיים.", skeleton: "import random" },
          { stepTitle: "שלב הקלט (Input)", explanation: "נקלוט 3 מחירים בזה אחר זה, נמיר כל קלט מ-str ל-float ונשמור ב-3 משתנים בעלי שם משמעותי.", skeleton: "price1 = float(input(...))\nprice2 = float(input(...))\nprice3 = float(input(...))" },
          { stepTitle: "שלב העיבוד (Processing)", explanation: "נחשב את סכום שלוש הקוביות, ונגריל את הקופון בין 10 ל-20.", skeleton: "sum_prices = ...\ncoupon = ..." },
          { stepTitle: "שלב הפלט (Output)", explanation: "נדפיס הודעה ברורה ולצידה את ההפרש בין הסכום לקופון.", skeleton: "print('Total price is:', ...)" }
        ],
        stage3: [
          {
            lineNum: 1,
            prompt: "ייבוא מודול ההגרלות:",
            codePrefix: "import ",
            codeSuffix: "",
            options: ["random", "math", "randint"],
            correct: "random",
            hint: "שם המודול שמכיל פונקציות אקראיות."
          },
          {
            lineNum: 2,
            prompt: "קליטת מחיר הקוביה הראשונה והמרתו למספר עשרוני (הרכבת פונקציות מבפנים החוצה):",
            codePrefix: "price1 = ",
            codeSuffix: "(input('Price of brand 1: '))",
            options: ["float", "int", "str"],
            correct: "float",
            hint: "מחיר יכול להיות 7.52, לכן נרצה מספר עשרוני."
          },
          {
            lineNum: 3,
            prompt: "באופן זהה נקלוט את השנייה והשלישית, ועכשיו נחשב את סכום שלושת המחירים:",
            codePrefix: "price2 = float(input('Price of brand 2: '))\nprice3 = float(input('Price of brand 3: '))\nsum_prices = ",
            codeSuffix: "",
            options: ["price1 + price2 + price3", "'price1' + 'price2' + 'price3'", "float(price1, price2, price3)"],
            correct: "price1 + price2 + price3",
            hint: "פשוט מחברים את שלושת המשתנים בעזרת האופרטור +."
          },
          {
            lineNum: 4,
            prompt: "הגרלת קופון שלם בין 10 ל-20 כולל:",
            codePrefix: "coupon = ",
            codeSuffix: "(10, 20)",
            options: ["random.randint", "randint", "random.random"],
            correct: "random.randint",
            hint: "זכרו לציין את שם המודול, נקודה, ושם הפונקציה למספר שלם."
          },
          {
            lineNum: 5,
            prompt: "הדפסת המחיר הסופי לאחר הפחתת הקופון בשורה אחת:",
            codePrefix: "print('Total price is:', ",
            codeSuffix: ")",
            options: ["sum_prices - coupon", "sum_prices // coupon", "coupon - sum_prices"],
            correct: "sum_prices - coupon",
            hint: "התשלום הכולל פחות שווי תו הקנייה."
          }
        ],
        stage4: {
          codeLines: [
            "import random",
            "price1 = float(input('Price of brand 1: '))",
            "price2 = float(input('Price of brand 2: '))",
            "price3 = float(input('Price of brand 3: '))",
            "sum_prices = price1 + price2 + price3",
            "coupon = random.randint(10, 20)",
            "print('Total price is:', sum_prices - coupon)"
          ],
          scenarios: [
            {
              name: "הרצה רגילה (מחירים: 12.5, 10.0, 8.5)",
              steps: [
                { line: 0, vars: {}, output: "", note: "פייתון טוענת את המודול random לזיכרון." },
                { line: 1, vars: { price1: "12.5" }, output: "Price of brand 1: 12.5", note: "input קלטה את המחרוזת '12.5', ו-float המירה אותה למספר 12.5." },
                { line: 2, vars: { price1: "12.5", price2: "10.0" }, output: "Price of brand 2: 10.0", note: "נקלט המחיר השני והוצב ב-price2." },
                { line: 3, vars: { price1: "12.5", price2: "10.0", price3: "8.5" }, output: "Price of brand 3: 8.5", note: "נקלט המחיר השלישי והוצב ב-price3." },
                { line: 4, vars: { price1: "12.5", price2: "10.0", price3: "8.5", sum_prices: "31.0" }, output: "", note: "מחשבים את צד ימין (12.5 + 10.0 + 8.5 = 31.0) ושומרים ב-sum_prices." },
                { line: 5, vars: { price1: "12.5", price2: "10.0", price3: "8.5", sum_prices: "31.0", coupon: "15" }, output: "", note: "הפונקציה randint הגרילה את המספר 15 מתוך הטווח [10, 20]." },
                { line: 6, vars: { price1: "12.5", price2: "10.0", price3: "8.5", sum_prices: "31.0", coupon: "15" }, output: "Total price is: 16.0", note: "print מחשבת קודם את הביטוי 31.0 - 15 (שזה 16.0) ומדפיסה עם רווח אוטומטי בין הארגומנטים!" }
              ]
            }
          ]
        }
      },
      {
        id: "ex1_2",
        title: "חברת הספרים המוקלטים ומבצע 1+10",
        difficulty: "בינוני - שימוש חכם במנה שלמה (//)",
        story: "פתחתם חברה לספרים מוקלטים! עלות הורדת ספר אחד היא 10 ש\"ח. על כל 10 הורדות מלאות, הלקוחה מקבלת ספר אחד נוסף בחינם (למשל על 9 ספרים -> 0 חינם, על 12 ספרים -> 1 חינם, על 25 ספרים -> 2 חינם). כתבו תוכנית הקולטת שם לקוחה ומספר ספרים, ומדפיסה את המחיר לתשלום ואת מספר הספרים שקיבלה בחינם.",
        stage1: {
          questionInput: "אילו המרות נבצע על הקלטים בשאלה הזו?",
          optionsInput: [
            { id: "a", text: "שם הלקוחה נשאר str (בלי המרה), ומספר הספרים מומר ל-int", correct: true, feedback: "מצוין! שם הוא טקסט ו-input כבר מחזירה str. מספר ספרים הוא בהכרח שלם ולכן נמיר ל-int." },
            { id: "b", text: "נמיר את שניהם ל-int", correct: false, feedback: "אי אפשר להמיר שם כמו 'Yasmin' למספר שלם — זה יגרום ל-ValueError." }
          ],
          questionPattern: "איזה אופרטור חשבוני יענה מיד על השאלה 'כמה פעמים שלמות 10 נכנס במספר הספרים'?",
          optionsPattern: [
            { id: "p1", text: "חילוק רגיל: books_num / 10", correct: false, feedback: "חילוק רגיל ב-12 ספרים ייתן 1.2 ספרים בחינם! אנחנו רוצים רק עשיריות שלמות." },
            { id: "p2", text: "שארית החלוקה: books_num % 10", correct: false, feedback: "שארית של 12 חלקי 10 תיתן 2 (העודף), אבל על 12 ספרים מגיע רק ספר 1 חינם." },
            { id: "p3", text: "חלוקה כלפי מטה (מנה שלמה): books_num // 10", correct: true, feedback: "בול! // בודק כמה פעמים שלמות 10 נכנס במספר. ב-9 ספרים התוצאה 0, ב-12 התוצאה 1, וב-25 התוצאה 2!" }
          ]
        },
        stage2: [
          { stepTitle: "קליטת הנתונים", explanation: "נקלוט את השם (ללא המרה) ואת מספר הספרים (עם המרה ל-int).", skeleton: "name = input(...)\nbooks_num = int(input(...))" },
          { stepTitle: "הגדרת מחיר במשתנה (כלליות)", explanation: "כמו שעופר הראה בתרגול: במקום לפזר את המספר 10 בקוד, נגדיר משתנה price = 10.", skeleton: "price = 10" },
          { stepTitle: "חישוב והדפסת עלות וספרי מתנה", explanation: "נכפיל ב-price לתשלום, ונחלק ב-// 10 למציאת מספר ספרי החינם.", skeleton: "print('Total price is:', ...)\nprint('Number of free books:', ...)" }
        ],
        stage3: [
          {
            lineNum: 1,
            prompt: "קליטת שם הלקוחה ומספר הספרים:",
            codePrefix: "name = input('Please enter your name: ')\nbooks_num = ",
            codeSuffix: "(input('Please enter number of books: '))",
            options: ["int", "float", "str"],
            correct: "int",
            hint: "מספר ספרים הוא תמיד מספר שלם."
          },
          {
            lineNum: 2,
            prompt: "שמירת מחיר ספר במשתנה והדפסת המחיר הכולל:",
            codePrefix: "price = 10\nprint('Total price is:', ",
            codeSuffix: ")",
            options: ["books_num * price", "books_num + price", "books_num // price"],
            correct: "books_num * price",
            hint: "מספר הספרים כפול מחיר ספר בודד."
          },
          {
            lineNum: 3,
            prompt: "חישוב והדפסת מספר הספרים שניתנים בחינם (1 על כל 10 מלאים):",
            codePrefix: "print('Number of free books:', ",
            codeSuffix: ")",
            options: ["books_num // 10", "books_num % 10", "books_num / 10"],
            correct: "books_num // 10",
            hint: "האופרטור שמחזיר את המנה השלמה בחלוקה ב-10."
          }
        ],
        stage4: {
          codeLines: [
            "name = input('Please enter your name: ')",
            "books_num = int(input('Please enter number of books: '))",
            "price = 10",
            "print('Total price is:', books_num * price)",
            "print('Number of free books:', books_num // 10)"
          ],
          scenarios: [
            {
              name: "לקוחה שקונה 12 ספרים",
              steps: [
                { line: 0, vars: { name: "'Roni'" }, output: "Please enter your name: Roni", note: "נקלטה המחרוזת 'Roni'." },
                { line: 1, vars: { name: "'Roni'", books_num: "12" }, output: "Please enter number of books: 12", note: "המחרוזת '12' הומרה למספר השלם 12." },
                { line: 2, vars: { name: "'Roni'", books_num: "12", price: "10" }, output: "", note: "הגדרנו את מחיר היחידה במשתנה." },
                { line: 3, vars: { name: "'Roni'", books_num: "12", price: "10" }, output: "Total price is: 120", note: "12 כפול 10 נותן 120 ש\"ח." },
                { line: 4, vars: { name: "'Roni'", books_num: "12", price: "10" }, output: "Number of free books: 1", note: "12 // 10 נותן מנה 1 (ושארית 2 שנזרקת) -> ספר אחד חינם!" }
              ]
            },
            {
              name: "לקוחה שקונה 9 ספרים (פחות מ-10)",
              steps: [
                { line: 0, vars: { name: "'Dana'" }, output: "Please enter your name: Dana", note: "נקלט השם." },
                { line: 1, vars: { name: "'Dana'", books_num: "9" }, output: "Please enter number of books: 9", note: "נקלט המספר 9." },
                { line: 2, vars: { name: "'Dana'", books_num: "9", price: "10" }, output: "", note: "price = 10" },
                { line: 3, vars: { name: "'Dana'", books_num: "9", price: "10" }, output: "Total price is: 90", note: "9 * 10 = 90" },
                { line: 4, vars: { name: "'Dana'", books_num: "9", price: "10" }, output: "Number of free books: 0", note: "כמה פעמים 10 נכנס ב-9? 0 פעמים! לכן בלי שום תנאי if קיבלנו 0 ספרים בחינם." }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "שיעור 2: התניות וביטויים לוגיים (if / elif / else)",
    subtitle: "ערכים בוליאניים (True/False), תבנית ערך ברירת מחדל, ומקרי קצה",
    icon: "🔀",
    color: "emerald",
    analogyTitle: "אנלוגיית השומר בכניסה וערך ברירת המחדל",
    analogyText: "משפט if הוא כמו שומר בכניסה למועדון: הוא שואל שאלת כן/לא (ביטוי לוגי שמחזיר True או False). אם התשובה היא True — נכנסים לחדר המוזז ימינה (4 רווחים - גוף ה-if). סוד מקצועי של עופר: במקום לבנות מגדלים של if ו-else, פעמים רבות עדיף לתת למשתנה 'ערך ברירת מחדל' מראש (למשל price = 90), ולשנות אותו ל-50 רק אם תנאי ההנחה מתקיים!",
    goldenRules: [
      { title: "הבחנה קריטית: = לעומת ==", desc: "סימן = יחיד הוא פעולת השמה (הכנסת ערך לתא). סימן == כפול הוא שאלת השוואה ('האם שווה ל-?') שמחזירה True או False." },
      { title: "תבנית ערך ברירת מחדל (חיסכון ב-else)", desc: "אם משתנה צריך לקבל 10 או 20 לפי תנאי, נאתחל אותו מראש ל-10 (coupon = 10), ונכתוב רק if אחד שבודק מתי לשנות ל-20." },
      { title: "אי-שכפול קוד ומניעת NameError", desc: "אם הדפסה או חישוב מתבצעים גם ב-if וגם ב-else — נוציא אותם מחוץ למבנה ה-if! כמו כן, ודאו שמשתנה מוגדר בכל מסלולי הזרימה." },
      { title: "סדר ב-if...elif...else ומקרי קצה", desc: "ברגע שתנאי אחד בשרשרת if/elif מתקיים (True), פייתון מבצעת אותו ומדלגת על כל ה-elif וה-else שאחריו! תמיד בדקו מקרי קצה (כמו המספר 50 בדיוק כשבודקים > 50)." }
    ],
    exercises: [
      {
        id: "ex2_1",
        title: "קופון מותנה בבוטיק השוקולדים (מניעת NameError וחיסכון ב-else)",
        difficulty: "בינוני - תבנית ברירת מחדל ב-if מקונן",
        story: "כתבו תוכנית הקולטת סכום קנייה (sum_prices) ואת שם החודש הנוכחי (month). אם הסכום גדול מ-50 וגם החודש הוא מאי ('Mai') תינתן הנחה של 20 ש\"ח. אם הסכום גדול מ-50 והחודש אינו מאי, תינתן הנחה של 10 ש\"ח. בכל מקרה אחר (סכום 50 ומטה) לא תינתן הנחה (0 ש\"ח) ותודפס ההודעה 'No coupon given'. לבסוף יודפס הסכום הסופי לתשלום.",
        stage1: {
          questionInput: "איך נמנע קריסה של התוכנית (NameError) אם הסכום קטן או שווה ל-50 ובסוף התוכנית אנחנו מחשבים sum_prices - coupon?",
          optionsInput: [
            { id: "a", text: "נגדיר את coupon רק בתוך גוף ה-if של סכום > 50", correct: false, feedback: "אם הסכום יהיה 40, לא ניכנס ל-if, המשתנה coupon לעולם לא ייווצר, ובסוף התוכנית נקבל NameError!" },
            { id: "b", text: "נגדיר coupon = 0 כברירת מחדל(או ב-else), כך שתמיד יהיה לו ערך חוקי לחיסור בסוף", correct: true, feedback: "חשיבה תכנותית מצוינת! אם לא ניתנה הנחה, הקופון הוא 0, ואז החיסור sum_prices - coupon עובד תמיד בלי לשכפל את שורת ההדפסה." }
          ],
          questionPattern: "בתוך המקרה שבו הסכום גדול מ-50, איך נחסוך את ה-else הפנימי שבודק את חודש מאי?",
          optionsPattern: [
            { id: "p1", text: "נציב מראש coupon = 10, ונוסיף if שבודק: אם month == 'Mai' נשנה ל-coupon = 20", correct: true, feedback: "בדיוק התבנית שעופר הראה בשיעור! מניחים שהחודש אינו מאי (10 ש\"ח), ומשנים ל-20 רק אם החודש הוא מאי." },
            { id: "p2", text: "נציב coupon = 20 אחרי ה-if של חודש מאי", correct: false, feedback: "זהירות! אם נציב את ברירת המחדל אחרי ה-if, היא תדרוס את הערך של חודש מאי בכל מקרה. ברירת מחדל תמיד באה לפני ה-if!" }
          ]
        },
        stage2: [
          { stepTitle: "קליטת הסכום והחודש", explanation: "נקלוט את סכום הקוביות ואת שם החודש הנוכחי.", skeleton: "sum_prices = float(input(...))\nmonth = input(...)" },
          { stepTitle: "בדיקה חיצונית: האם הסכום גדול מ-50?", explanation: "מכיוון שגם ההנחה של 20 וגם ההנחה של 10 דורשות סכום > 50, נבדוק זאת ב-if החיצוני.", skeleton: "if sum_prices > 50:\n    ..." },
          { stepTitle: "קביעת הקופון עם ברירת מחדל (ללא else פנימי)", explanation: "בתוך ה-if החיצוני, נניח שהקופון הוא 10, ואם החודש הוא 'Mai' נעדכן אותו ל-20.", skeleton: "    coupon = 10\n    if month == 'Mai':\n        coupon = 20" },
          { stepTitle: "טיפול ב-else החיצוני וחישוב סופי אחיד", explanation: "אם הסכום לא גדול מ-50, הקופון הוא 0 ונדפיס הודעה. מחוץ ל-if נוריד את הקופון ונדפיס.", skeleton: "else:\n    coupon = 0\n    print('No coupon given')\nprint(sum_prices - coupon)" }
        ],
        stage3: [
          {
            lineNum: 1,
            prompt: "פתיחת התנאי החיצוני שבודק האם סכום המחירים גדול ממש מ-50:",
            codePrefix: "sum_prices = float(input('Enter sum: '))\nmonth = input('Enter month: ')\nif ",
            codeSuffix: ":",
            options: ["sum_prices > 50", "sum_prices >= 50", "sum_prices == 50"],
            correct: "sum_prices > 50",
            hint: "גדול ממש מ-50 (50 הוא מקרה קצה שלא מקבל הנחה)."
          },
          {
            lineNum: 2,
            prompt: "בתוך ה-if: הגדרת ערך ברירת מחדל לקופון (עבור חודש רגיל) ובדיקה אם החודש הוא 'Mai':",
            codePrefix: "    coupon = 10\n    if ",
            codeSuffix: ":\n        coupon = 20",
            options: ["month == 'Mai'", "month = 'Mai'", "month != 'Mai'"],
            correct: "month == 'Mai'",
            hint: "לבדיקת שוויון בפייתון משתמשים בפעמיים שווה (==)."
          },
          {
            lineNum: 3,
            prompt: "בחלק ה-else החיצוני (כשהסכום <= 50), נאתחל את הקופון כדי שלא יחסר בסוף:",
            codePrefix: "else:\n    ",
            codeSuffix: "\n    print('No coupon given.')",
            options: ["coupon = 0", "coupon == 0", "sum_prices = 0"],
            correct: "coupon = 0",
            hint: "אם אין הנחה, שווי הקופון שמופחת מהמחיר הוא 0."
          },
          {
            lineNum: 4,
            prompt: "מחוץ ל-if/else (מתבצע בכל מקרה ללא שכפול קוד!): הפחתת הקופון והדפסה:",
            codePrefix: "sum_prices = ",
            codeSuffix: "\nprint('Total price is:', sum_prices)",
            options: ["sum_prices - coupon", "coupon - sum_prices", "sum_prices"],
            correct: "sum_prices - coupon",
            hint: "הסכום המקורי פחות הקופון (שיהיה 20, 10 או 0)."
          }
        ],
        stage4: {
          codeLines: [
            "sum_prices = float(input('Enter sum: '))",
            "month = input('Enter month: ')",
            "if sum_prices > 50:",
            "    coupon = 10",
            "    if month == 'Mai':",
            "        coupon = 20",
            "else:",
            "    coupon = 0",
            "    print('No coupon given.')",
            "sum_prices = sum_prices - coupon",
            "print('Total price is:', sum_prices)"
          ],
          scenarios: [
            {
              name: "סכום 60 בחודש 'Mai'",
              steps: [
                { line: 0, vars: { sum_prices: "60.0" }, output: "", note: "נקלט סכום 60.0." },
                { line: 1, vars: { sum_prices: "60.0", month: "'Mai'" }, output: "", note: "נקלט החודש 'Mai'." },
                { line: 2, vars: { sum_prices: "60.0", month: "'Mai'" }, output: "", note: "בדיקה: האם 60.0 > 50? התוצאה True! נכנסים לגוף ה-if." },
                { line: 3, vars: { sum_prices: "60.0", month: "'Mai'", coupon: "10" }, output: "", note: "קופון מקבל תחילה את ברירת המחדל 10." },
                { line: 4, vars: { sum_prices: "60.0", month: "'Mai'", coupon: "10" }, output: "", note: "בדיקה פנימית: האם month == 'Mai'? התוצאה True!" },
                { line: 5, vars: { sum_prices: "60.0", month: "'Mai'", coupon: "20" }, output: "", note: "הקופון מתעדכן מ-10 ל-20. מדלגים על ה-else החיצוני!" },
                { line: 9, vars: { sum_prices: "40.0", month: "'Mai'", coupon: "20" }, output: "", note: "מחוץ ל-if: מפחיתים 20 מ-60.0 ומקבלים 40.0." },
                { line: 10, vars: { sum_prices: "40.0", month: "'Mai'", coupon: "20" }, output: "Total price is: 40.0", note: "מדפיסים את הסכום הסופי." }
              ]
            },
            {
              name: "מקרה קצה: סכום 50.0 בדיוק!",
              steps: [
                { line: 0, vars: { sum_prices: "50.0" }, output: "", note: "בודקים את מקרה הגבול: סכום של 50 בדיוק." },
                { line: 1, vars: { sum_prices: "50.0", month: "'Mai'" }, output: "", note: "גם אם החודש הוא מאי..." },
                { line: 2, vars: { sum_prices: "50.0", month: "'Mai'" }, output: "", note: "האם 50.0 > 50? התוצאה היא False! כי 50 שווה ל-50 ולא גדול ממנו." },
                { line: 7, vars: { sum_prices: "50.0", month: "'Mai'", coupon: "0" }, output: "", note: "קופצים ל-else! מציבים coupon = 0." },
                { line: 8, vars: { sum_prices: "50.0", month: "'Mai'", coupon: "0" }, output: "No coupon given.", note: "מדפיסים שלא ניתן קופון." },
                { line: 9, vars: { sum_prices: "50.0", month: "'Mai'", coupon: "0" }, output: "", note: "50.0 פחות 0 נשאר 50.0 (בלי שגיאת NameError!)." },
                { line: 10, vars: { sum_prices: "50.0", month: "'Mai'", coupon: "0" }, output: "Total price is: 50.0", note: "התוכנית הסתיימה בהצלחה." }
              ]
            }
          ]
        }
      },
      {
        id: "ex2_2",
        title: "חגיגת יום השנה בבוטיק (מבנה if-elif ושליפת ספרות)",
        difficulty: "בינוני - סדר בדיקות ב-elif ושימוש ב-% ו-//",
        story: "גיל הלקוחות הוא מספר דו-ספרתי (בין 10 ל-99). הבוטיק מחלק קוביות שוקולד במתנה לפי הכללים הבאים (לפי הסדר! ברגע שתנאי מתקיים, לא בודקים את הבאים): 1. אם ספרת האחדות בגיל היא 7 -> 2 קוביות. 2. אם ספרת העשרות בגיל היא 7 -> 3 קוביות. 3. אם הגיל מתחלק ב-7 ללא שארית -> 4 קוביות. 4. אחרת -> קוביה 1.",
        stage1: {
          questionInput: "איך נשלוף מתוך מספר דו-ספרתי `age` את ספרת האחדות ואת ספרת העשרות?",
          optionsInput: [
            { id: "a", text: "אחדות: age % 10, עשרות: age // 10", correct: true, feedback: "אלוף! למשל בגיל 73: שארית החלוקה ב-10 (73 % 10) היא 3 (אחדות), והמנה השלמה (73 // 10) היא 7 (עשרות)." },
            { id: "b", text: "אחדות: age // 10, עשרות: age % 10", correct: false, feedback: "הפוך! // 10 נותן כמה עשרות שלמות יש במספר, ו-% 10 נותן את שארית האחדות." }
          ],
          questionPattern: "מדוע חובה להשתמש כאן ב-if...elif...elif ולא בשלושה משפטי if נפרדים?",
          optionsPattern: [
            { id: "p1", text: "כי בגיל כמו 77 כל התנאים מתקיימים! אם נכתוב if נפרדים, האחרון ידרוס את הראשון ונקבל 4 במקום 2.", correct: true, feedback: "פגיעה בול! במבנה if-elif, ברגע שהתנאי הראשון (אחדות == 7) מתקיים עבור 77, נקבע 2 קוביות ופייתון תדלג על שאר ה-elif!" },
            { id: "p2", text: "כי אסור בפייתון לכתוב שני משפטי if זה אחר זה", correct: false, feedback: "מותר לכתוב if נפרדים, אבל אז כל הבדיקות יתבצעו תמיד זו אחר זו." }
          ]
        },
        stage2: [
          { stepTitle: "קליטת הגיל וברירת מחדל", explanation: "נקלוט את הגיל כ-int. אפשר להגדיר cubes_num = 1 כברירת מחדל (או ב-else בסוף).", skeleton: "age = int(input('Enter your age: '))\ncubes_num = 1" },
          { stepTitle: "תנאי ראשון (if): ספרת האחדות היא 7", explanation: "נבדוק אם השארית מחלוקה ב-10 שווה ל-7.", skeleton: "if age % 10 == 7:\n    cubes_num = 2" },
          { stepTitle: "תנאי שני ושלישי (elif): עשרות ומתחלק ב-7", explanation: "נשתמש ב-elif כדי שייבדקו רק אם הקודמים היו False.", skeleton: "elif age // 10 == 7:\n    cubes_num = 3\nelif age % 7 == 0:\n    cubes_num = 4" }
        ],
        stage3: [
          {
            lineNum: 1,
            prompt: "קליטת הגיל והגדרת ברירת מחדל של קוביה אחת (חוסך את ה-else בסוף!):",
            codePrefix: "age = int(input('Please enter your age: '))\ncubes_num = ",
            codeSuffix: "",
            options: ["1", "0", "2"],
            correct: "1",
            hint: "אם אף אחד משלושת התנאים לא מתקיים, תינתן קוביה אחת."
          },
          {
            lineNum: 2,
            prompt: "תנאי 1: בדיקה האם ספרת האחדות בגיל שווה ל-7:",
            codePrefix: "if ",
            codeSuffix: " == 7:\n    cubes_num = 2",
            options: ["age % 10", "age // 10", "age / 10"],
            correct: "age % 10",
            hint: "שארית החלוקה ב-10 מחלצת את ספרת האחדות."
          },
          {
            lineNum: 3,
            prompt: "תנאי 2 (רק אם הראשון לא התקיים): בדיקה האם ספרת העשרות שווה ל-7:",
            codePrefix: "elif ",
            codeSuffix: " == 7:\n    cubes_num = 3",
            options: ["age // 10", "age % 10", "age % 7"],
            correct: "age // 10",
            hint: "חלוקה שלמה ב-10 מחלצת את ספרת העשרות."
          },
          {
            lineNum: 4,
            prompt: "תנאי 3 (רק אם הקודמים לא התקיימו): בדיקה האם הגיל מתחלק ב-7 ללא שארית:",
            codePrefix: "elif ",
            codeSuffix: ":\n    cubes_num = 4\nprint('Cubes:', cubes_num)",
            options: ["age % 7 == 0", "age // 7 == 0", "age / 7 == 0"],
            correct: "age % 7 == 0",
            hint: "מתחלק ללא שארית פירושו שהשארית (%) שווה ל-0."
          }
        ],
        stage4: {
          codeLines: [
            "age = int(input('Please enter your age: '))",
            "cubes_num = 1",
            "if age % 10 == 7:",
            "    cubes_num = 2",
            "elif age // 10 == 7:",
            "    cubes_num = 3",
            "elif age % 7 == 0:",
            "    cubes_num = 4",
            "print('Cubes:', cubes_num)"
          ],
          scenarios: [
            {
              name: "גיל 70 (גם עשרות 7 וגם מתחלק ב-7!)",
              steps: [
                { line: 0, vars: { age: "70" }, output: "", note: "נקלט הגיל 70." },
                { line: 1, vars: { age: "70", cubes_num: "1" }, output: "", note: "ברירת המחדל מאותחלת ל-1." },
                { line: 2, vars: { age: "70", cubes_num: "1" }, output: "", note: "בדיקה 1: האם 70 % 10 == 7? (0 == 7) -> False. עוברים ל-elif הבא." },
                { line: 4, vars: { age: "70", cubes_num: "1" }, output: "", note: "בדיקה 2: האם 70 // 10 == 7? (7 == 7) -> True! נכנסים פנימה." },
                { line: 5, vars: { age: "70", cubes_num: "3" }, output: "", note: "cubes_num מתעדכן ל-3. כעת מדלגים על ה-elif השלישי למרות ש-70 מתחלק ב-7!" },
                { line: 8, vars: { age: "70", cubes_num: "3" }, output: "Cubes: 3", note: "הודפס 3." }
              ]
            },
            {
              name: "גיל 56 (מתחלק ב-7)",
              steps: [
                { line: 0, vars: { age: "56" }, output: "", note: "נקלט הגיל 56." },
                { line: 1, vars: { age: "56", cubes_num: "1" }, output: "", note: "cubes_num = 1" },
                { line: 2, vars: { age: "56", cubes_num: "1" }, output: "", note: "56 % 10 הוא 6 != 7 -> False." },
                { line: 4, vars: { age: "56", cubes_num: "1" }, output: "", note: "56 // 10 הוא 5 != 7 -> False." },
                { line: 6, vars: { age: "56", cubes_num: "1" }, output: "", note: "56 % 7 הוא 0 == 0 -> True!" },
                { line: 7, vars: { age: "56", cubes_num: "4" }, output: "", note: "cubes_num מתעדכן ל-4." },
                { line: 8, vars: { age: "56", cubes_num: "4" }, output: "Cubes: 4", note: "הודפס 4." }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "שיעור 3: לולאת while וטבלאות מעקב",
    subtitle: "תבנית א' (קליטה מקדימה), תבנית ב' (break / משתנה דגל), קליטת זוגות ודחיית המרה",
    icon: "🔄",
    color: "amber",
    analogyTitle: "אנלוגיית הקופאי בסופר ומסוע המוצרים",
    analogyText: "לולאת while נועדה למצבים שבהם אנחנו לא יודעים מראש כמה פעמים הקוד ירוץ! תחשבו על קופאי בסופר שמעביר מוצרים אחד-אחד כל עוד הלקוח לא הניח את 'המחיצה לעצירה' (למשל המילה 'q' או -1). בתבנית א', הקופאי מסתכל על המוצר הראשון לפני הפעלת המסוע, ובסוף כל מוצר הוא חייב לקחת את המוצר הבא (אחרת הוא יעביר את אותו קוטג' לנצח - לולאה אינסופית!).",
    goldenRules: [
      { title: "השלד הקבוע של תבנית א'", desc: "1. קליטה ראשונה לפני הלולאה. 2. שורת while עם תנאי המשך (כל עוד != סימן עצירה). 3. קליטה חוזרת בשורה האחרונה של גוף הלולאה (התקווה לעצירה!)." },
      { title: "זהירות מהמרת 'q' ל-float לפני הזמן!", desc: "אם תנאי העצירה הוא מחרוזת כמו 'q' אבל הקלטים הם מספרים, אסור לכתוב float(input())! קולטים כמחרוזת, בודקים ב-while שזה לא 'q', ורק בשורה הראשונה בתוך הלולאה ממירים: grade = float(grade)." },
      { title: "קליטת זוגות בלולאה", desc: "כשקולטים זוג (למשל שם בוטיק ונקודות) ורק הראשון יכול להיות 'q', קולטים לפני הלולאה רק את השם! את הנקודות קולטים כפעולה ראשונה בתוך הלולאה, אחרי שווידאנו שהשם אינו 'q'." },
      { title: "תבנית ב' ללא break (משתנה דגל + continue)", desc: "עופר מעדיף להימנע מ-break. במקום זאת: מאתחלים proceed = True, רצים ב-while proceed:, וכשרוצים לעצור מציבים proceed = False ומבצעים continue (שמדלג מיד לבדיקת התנאי בראש הלולאה!)." }
    ],
    exercises: [
      {
        id: "ex3_1",
        title: "מחשבון ממוצע ציונים (מלכודת ההמרה ל-float)",
        difficulty: "בינוני - שלד while תבנית א' + דחיית המרה",
        story: "כתבו תוכנית הקולטת ציונים (מספרים עשרוניים) בזה אחר זה כל עוד לא הוזנה המחרוזת 'q'. בסיום, התוכנית תדפיס את ממוצע הציונים.",
        stage1: {
          questionInput: "מדוע השורה `grade = float(input('Enter grade: '))` לפני הלולאה תגרום לקריסת התוכנית?",
          optionsInput: [
            { id: "a", text: "כי כשנרצה לסיים ונקליד 'q', הפונקציה float('q') תקרוס עם ValueError!", correct: true, feedback: "בול! float יודעת להמיר רק מחרוזות שמייצגות מספרים. לכן נקלוט תחילה כמחרוזת, ורק בתוך הלולאה (אחרי שידוע ש-grade != 'q') נמיר ל-float." },
            { id: "b", text: "כי ציונים הם תמיד מספרים שלמים", correct: false, feedback: "גם int('q') הייתה קורסת בדיוק מאותה סיבה!" }
          ],
          questionPattern: "מהן שלוש שורות השלד הטכני של לולאת while בתבנית א' עבור קליטת grade?",
          optionsPattern: [
            { id: "p1", text: "קליטת grade לפני ה-while -> בדיקת while grade != 'q': -> קליטת grade שוב בסוף גוף ה-while", correct: true, feedback: "זהו השלד הברזל של תבנית א'! קולטים לפני כדי שיהיה מה לבדוק, וקולטים בסוף הלולאה כדי לתת סיכוי שהמשתמשת תקליד 'q' והלולאה תסתיים." },
            { id: "p2", text: "בדיקת while grade != 'q': -> קליטת grade בתוך הלולאה בלבד", correct: false, feedback: "אם לא נקלוט או נאתחל את grade לפני ה-while, פייתון לא תכיר את המשתנה grade בשורת הבדיקה הראשונה (NameError)." }
          ]
        },
        stage2: [
          { stepTitle: "שלב 1: אתחול מונים וקליטה ראשונה (כמחרוזת!)", explanation: "נאתחל total ו-count ל-0, ונקלוט את הערך הראשון כ-str בלי float.", skeleton: "total = 0\ncount = 0\ngrade = input('Please enter grade: ')" },
          { stepTitle: "שלב 2: תנאי הלולאה והמרה בטוחה", explanation: "כל עוד הקלט אינו 'q', ניכנס ללולאה ומיד נמיר את המחרוזת למספר עשרוני.", skeleton: "while grade != 'q':\n    grade = float(grade)" },
          { stepTitle: "שלב 3: עדכון מונה וסכום + קליטה חוזרת", explanation: "נגדיל את המונה ב-1, נוסיף לסכום, ונקלוט את הציון הבא כמחרוזת.", skeleton: "    count = count + 1\n    total = total + grade\n    grade = input('Please enter grade: ')" }
        ],
        stage3: [
          {
            lineNum: 1,
            prompt: "קליטה ראשונה לפני הלולאה (זכרו: עדיין לא ממירים למספר!):",
            codePrefix: "total = 0\ncount = 0\ngrade = ",
            codeSuffix: "('Please enter grade: ')",
            options: ["input", "float(input", "int(input"],
            correct: "input",
            hint: "המשתמשת עלולה להקליד 'q' כבר בפעם הראשונה."
          },
          {
            lineNum: 2,
            prompt: "שורת הפתיחה של הלולאה (תנאי ההמשך):",
            codePrefix: "while ",
            codeSuffix: ":",
            options: ["grade != 'q'", "grade == 'q'", "grade != q"],
            correct: "grade != 'q'",
            hint: "נמשיך כל עוד המחרוזת ב-grade שונה מהמחרוזת 'q'."
          },
          {
            lineNum: 3,
            prompt: "השורה הראשונה בגוף הלולאה (עכשיו בטוח ש-grade הוא מספר ולא 'q'!):",
            codePrefix: "    grade = ",
            codeSuffix: "\n    count = count + 1\n    total = total + grade",
            options: ["float(grade)", "str(grade)", "input(grade)"],
            correct: "float(grade)",
            hint: "ממירים את המחרוזת למספר עשרוני כדי שנוכל לחבר אותה ל-total."
          },
          {
            lineNum: 4,
            prompt: "השורה האחרונה בגוף הלולאה (שמונעת לולאה אינסופית!):",
            codePrefix: "    grade = ",
            codeSuffix: "\nprint('Average is:', total / count)",
            options: ["input('Please enter grade: ')", "float(input('Please enter grade: '))", "grade + 1"],
            correct: "input('Please enter grade: ')",
            hint: "קולטים את הציון הבא (או 'q') שוב כמחרוזת לקראת בדיקת ה-while הבאה."
          }
        ],
        stage4: {
          codeLines: [
            "total = 0",
            "count = 0",
            "grade = input('Please enter grade: ')",
            "while grade != 'q':",
            "    grade = float(grade)",
            "    count = count + 1",
            "    total = total + grade",
            "    grade = input('Please enter grade: ')",
            "print('Average is:', total / count)"
          ],
          scenarios: [
            {
              name: "הזנת ציונים: '100', '80', ואז 'q'",
              steps: [
                { line: 0, vars: { total: "0" }, output: "", note: "מאתחלים סכום ל-0." },
                { line: 1, vars: { total: "0", count: "0" }, output: "", note: "מאתחלים מונה ל-0." },
                { line: 2, vars: { total: "0", count: "0", grade: "'100'" }, output: "Please enter grade: 100", note: "נקלטה המחרוזת '100' (שימו לב לגרשיים!)." },
                { line: 3, vars: { total: "0", count: "0", grade: "'100'" }, output: "", note: "האם '100' != 'q'? True! נכנסים לסיבוב 1." },
                { line: 4, vars: { total: "0", count: "0", grade: "100.0" }, output: "", note: "כעת grade מומר מהמחרוזת '100' למספר 100.0." },
                { line: 5, vars: { total: "0", count: "1", grade: "100.0" }, output: "", note: "המונה עולה ל-1." },
                { line: 6, vars: { total: "100.0", count: "1", grade: "100.0" }, output: "", note: "הסכום מתעדכן ל-100.0." },
                { line: 7, vars: { total: "100.0", count: "1", grade: "'80'" }, output: "Please enter grade: 80", note: "קולטים את הקלט הבא כמחרוזת '80' וחוזרים לשורת ה-while!" },
                { line: 3, vars: { total: "100.0", count: "1", grade: "'80'" }, output: "", note: "האם '80' != 'q'? True! נכנסים לסיבוב 2." },
                { line: 4, vars: { total: "100.0", count: "1", grade: "80.0" }, output: "", note: "מומר למספר 80.0." },
                { line: 5, vars: { total: "100.0", count: "2", grade: "80.0" }, output: "", note: "count עולה ל-2." },
                { line: 6, vars: { total: "180.0", count: "2", grade: "80.0" }, output: "", note: "total עולה ל-180.0." },
                { line: 7, vars: { total: "180.0", count: "2", grade: "'q'" }, output: "Please enter grade: q", note: "המשתמשת מקלידה 'q' כדי לסיים!" },
                { line: 3, vars: { total: "180.0", count: "2", grade: "'q'" }, output: "", note: "בדיקת תנאי הלולאה: האם 'q' != 'q'? התוצאה False! יוצאים מהלולאה." },
                { line: 8, vars: { total: "180.0", count: "2", grade: "'q'" }, output: "Average is: 90.0", note: "מדפיסים 180.0 חלקי 2 = 90.0." }
              ]
            }
          ]
        }
      },
      {
        id: "ex3_2",
        title: "תחרות הגלידריות Sweety מול Frozen (זוגות ומשתנה דגל)",
        difficulty: "מתקדם - קליטת זוגות ומניעת קליטה מיותרת בעזרת דגל",
        story: "שני בוטיקי גלידה, 'sweety' ו-'frozen', מתחרים! בכל הצבעה נקלטים זוג נתונים: שם הבוטיק ומספר נקודות (0-9). ההצבעות נפסקות כאשר מוזן 'q' בתור שם הבוטיק, או כאשר ההפרש בערך מוחלט בין סכומי הנקודות של שני הבוטיקים גדול מ-5. כתבו תוכנית ללא קליטות מיותרות וללא break!",
        stage1: {
          questionInput: "מדוע לפני הלולאה נקלוט רק את שם הבוטיק (`name`) ולא את הנקודות (`points`)?",
          optionsInput: [
            { id: "a", text: "כי אם המשתמשת מקלידה 'q' בתור שם הבוטיק, אסור לבקש ממנה להזין נקודות!", correct: true, feedback: "מעולה! רק אחרי שנכנסנו ללולאה וגילינו שהשם אינו 'q', נשלים את הזוג ונקלוט את ה-points." },
            { id: "b", text: "כי אי אפשר לקלוט שני משתנים לפני לולאת while", correct: false, feedback: "אפשר טכנית, אבל אז אם יוקלד 'q' התוכנית עדיין תבקש נקודות לחינם." }
          ],
          questionPattern: "איך נמנע קליטה מיותרת של שם בוטיק בסוף הסיבוב אם הפרש הנקודות כבר עבר את 5?",
          optionsPattern: [
            { id: "p1", text: "נחזיק משתנה דגל diff_ok = True. אם ההפרש > 5 נציב diff_ok = False ונבצע continue (או נקלוט שם רק if diff_ok).", correct: true, feedback: "אלגנטי ביותר! ברגע ש-diff_ok הופך ל-False, אנחנו מדלגים על קליטת השם הבא ויוצאים מיד בתנאי ה-while." },
            { id: "p2", text: "נקלוט תמיד את השם בסוף הלולאה ורק אז נבדוק ב-while את ההפרש", correct: false, feedback: "זו בדיוק הבעיה שעופר הראה בשיעור: אם ההפרש הפך ל-6, המשתמשת תתבקש להקליד עוד שם בוטיק סתם לפני שהלולאה תיעצר." }
          ]
        },
        stage2: [
          { stepTitle: "אתחול סכומים, דגל וקליטת שם ראשון", explanation: "נאתחל סכומים ל-0, דגל diff_ok ל-True, ונקלוט את השם הראשון.", skeleton: "sweety_pts = 0\nfrozen_pts = 0\ndiff_ok = True\nname = input('Boutique name: ')" },
          { stepTitle: "תנאי הלולאה והשלמת הזוג (קליטת נקודות)", explanation: "נרוץ כל עוד השם אינו 'q' וגם diff_ok הוא True. בפנים נקלוט את הנקודות ונעדכן את הבוטיק המתאים.", skeleton: "while diff_ok and name != 'q':\n    pts = int(input('Points: '))\n    if name == 'sweety': ...\n    else: ..." },
          { stepTitle: "בדיקת ההפרש בערך מוחלט וקליטה מותנית", explanation: "נבדוק עם abs() אם ההפרש עדיין <= 5. רק אם כן, נקלוט את השם הבא!", skeleton: "    diff_ok = abs(sweety_pts - frozen_pts) <= 5\n    if diff_ok:\n        name = input('Boutique name: ')" }
        ],
        stage3: [
          {
            lineNum: 1,
            prompt: "שורת תנאי הלולאה המשלבת את בדיקת הדגל ובדיקת 'q':",
            codePrefix: "sweety_pts = 0\nfrozen_pts = 0\nname = input('Boutique name: ')\ndiff_ok = True\nwhile ",
            codeSuffix: ":",
            options: ["diff_ok and name != 'q'", "diff_ok or name != 'q'", "name == 'q'"],
            correct: "diff_ok and name != 'q'",
            hint: "שני התנאים חייבים להתקיים יחד כדי שנמשיך לסיבוב נוסף."
          },
          {
            lineNum: 2,
            prompt: "השלמת הזוג (קליטת הנקודות) והוספתן לבוטיק המתאים:",
            codePrefix: "    pts = int(input('Points: '))\n    if name == 'sweety':\n        ",
            codeSuffix: "\n    else:\n        frozen_pts += pts",
            options: ["sweety_pts += pts", "sweety_pts = pts", "sweety_pts += 1"],
            correct: "sweety_pts += pts",
            hint: "תבנית סכום: מוסיפים את הנקודות החדשות לסכום המצטבר של sweety."
          },
          {
            lineNum: 3,
            prompt: "עדכון הדגל: האם ההפרש בערך מוחלט עדיין קטן או שווה ל-5?",
            codePrefix: "    diff_ok = ",
            codeSuffix: " <= 5\n    if diff_ok:\n        name = input('Boutique name: ')",
            options: ["abs(sweety_pts - frozen_pts)", "sweety_pts - frozen_pts", "int(sweety_pts - frozen_pts)"],
            correct: "abs(sweety_pts - frozen_pts)",
            hint: "הפונקציה שמחשבת ערך מוחלט של הפרש (כדי לא להיות תלויים במי גדול ממי)."
          }
        ],
        stage4: {
          codeLines: [
            "sweety_pts = 0",
            "frozen_pts = 0",
            "name = input('Boutique name: ')",
            "diff_ok = True",
            "while diff_ok and name != 'q':",
            "    pts = int(input('Points: '))",
            "    if name == 'sweety':",
            "        sweety_pts += pts",
            "    else:",
            "        frozen_pts += pts",
            "    diff_ok = abs(sweety_pts - frozen_pts) <= 5",
            "    if diff_ok:",
            "        name = input('Boutique name: ')",
            "print('Sweety:', sweety_pts, 'Frozen:', frozen_pts)"
          ],
          scenarios: [
            {
              name: "עצירה בגלל הפרש > 5 (sweety: 3, frozen: 2, sweety: 5)",
              steps: [
                { line: 3, vars: { sweety_pts: "0", frozen_pts: "0", name: "'sweety'", diff_ok: "True" }, output: "", note: "ערכי התחלה: נקלט השם הראשון 'sweety' ו-diff_ok הוא True." },
                { line: 4, vars: { sweety_pts: "0", frozen_pts: "0", name: "'sweety'", diff_ok: "True" }, output: "", note: "תנאי ה-while מתקיים (True and True). נכנסים לסיבוב 1." },
                { line: 5, vars: { sweety_pts: "0", frozen_pts: "0", name: "'sweety'", diff_ok: "True", pts: "3" }, output: "Points: 3", note: "נקלטו 3 נקודות." },
                { line: 7, vars: { sweety_pts: "3", frozen_pts: "0", name: "'sweety'", diff_ok: "True", pts: "3" }, output: "", note: "sweety_pts עולה ל-3." },
                { line: 10, vars: { sweety_pts: "3", frozen_pts: "0", name: "'sweety'", diff_ok: "True", pts: "3" }, output: "", note: "abs(3 - 0) <= 5 הוא True. לכן diff_ok נשאר True." },
                { line: 12, vars: { sweety_pts: "3", frozen_pts: "0", name: "'frozen'", diff_ok: "True", pts: "3" }, output: "Boutique name: frozen", note: "מכיוון ש-diff_ok הוא True, קולטים את השם הבא: 'frozen'." },
                { line: 5, vars: { sweety_pts: "3", frozen_pts: "0", name: "'frozen'", diff_ok: "True", pts: "2" }, output: "Points: 2", note: "סיבוב 2: נקלטו 2 נקודות עבור frozen." },
                { line: 9, vars: { sweety_pts: "3", frozen_pts: "2", name: "'frozen'", diff_ok: "True", pts: "2" }, output: "", note: "frozen_pts עולה ל-2. ההפרש כעת 1 (<= 5)." },
                { line: 12, vars: { sweety_pts: "3", frozen_pts: "2", name: "'sweety'", diff_ok: "True", pts: "2" }, output: "Boutique name: sweety", note: "נקלט השם השלישי: 'sweety'." },
                { line: 5, vars: { sweety_pts: "3", frozen_pts: "2", name: "'sweety'", diff_ok: "True", pts: "5" }, output: "Points: 5", note: "סיבוב 3: נקלטו 5 נקודות עבור sweety." },
                { line: 7, vars: { sweety_pts: "8", frozen_pts: "2", name: "'sweety'", diff_ok: "True", pts: "5" }, output: "", note: "sweety_pts עולה ל-8!" },
                { line: 10, vars: { sweety_pts: "8", frozen_pts: "2", name: "'sweety'", diff_ok: "False", pts: "5" }, output: "", note: "רגע האמת! abs(8 - 2) הוא 6, ו-6 אינו <= 5. לכן diff_ok הופך ל-False!" },
                { line: 11, vars: { sweety_pts: "8", frozen_pts: "2", name: "'sweety'", diff_ok: "False", pts: "5" }, output: "", note: "האם diff_ok הוא True? לא! לכן מדלגים על קליטת שם מיותר וחוזרים ל-while." },
                { line: 4, vars: { sweety_pts: "8", frozen_pts: "2", name: "'sweety'", diff_ok: "False", pts: "5" }, output: "", note: "בדיקת ה-while: מאחר ש-diff_ok הוא False, הלולאה מסתיימת מיד!" },
                { line: 13, vars: { sweety_pts: "8", frozen_pts: "2", name: "'sweety'", diff_ok: "False", pts: "5" }, output: "Sweety: 8 Frozen: 2", note: "מדפיסים את התוצאות הסופיות." }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: "שיעור 4: תבניות אלגוריתמיות בלולאות",
    subtitle: "אמת/שקר, None בקלט ריק, מנייה, סכום, מקסימום + נלווה, רצף רצוף, ו'הקודם ל-'",
    icon: "🧩",
    color: "purple",
    analogyTitle: "ארגז התבניות של המתכנת המנוסה",
    analogyText: "מתכנתים מנוסים לא ממציאים את הגלגל מול דף ריק! יש להם בראש 7 תבניות קבועות: 1. אמת/שקר (מתג אור שמתחיל דלוק ונכבה אם מוצאים הפרה), 2. מנייה (קליקר של שומר שמתחיל ב-0), 3. סכום (קופת חיסכון שמתחילה ב-0), 4. מכפלה (מתחילה ב-1), 5. מקסימום/מינימום עם None ופתק נלווה ('אלוף זמני'), 6. רצף רצוף (מונה נוכחי שמתאפס מול שיא עולמי), ו-7. 'הקודם ל-' (שמירת הערך הנוכחי ב-prev שנייה לפני קליטת הבא!).",
    goldenRules: [
      { title: "מקסימום/מינימום: חובה לבדוק == None משמאל ל-or!", desc: "כדי לטפל בקלט ריק ובמספרים שליליים, מאתחלים max_num = None. בתוך הלולאה כותבים: if max_num == None or num > max_num. בגלל חישוב מקוצר (Short-circuit), בסיבוב הראשון התנאי השמאלי מחזיר True ופייתון לא מנסה להשוות מספר ל-None!" },
      { title: "נתון נלווה (Satellite Data)", desc: "כששואלים 'מי נתן את דמי הכיס הגדולים ביותר?', מתפעלים תבנית מקסימום על הכסף, ובאותו if שבו מעדכנים את max_allowance, מעדכנים בשורה מתחת גם את max_parent = parent." },
      { title: "תבנית 'הקודם ל-' (prev)", desc: "מאתחלים prev = None לפני הלולאה. בתוך הלולאה משווים את num ל-prev רק אם prev != None (כלומר החל מהסיבוב השני). והכי חשוב: שומרים prev = num שנייה אחת לפני שקולטים את ה-num הבא!" },
      { title: "תבנית רצף רצוף", desc: "משלבת מנייה ומקסימום: current_count גדל ב-1 כשהתנאי מתקיים ומתאפס ל-0 ב-else כשהרצף נקטע! מיד אחר כך בודקים אם current_count > max_count כדי לשמור את השיא." }
    ],
    exercises: [
      {
        id: "ex4_1",
        title: "מי מההורים נתן לדניאלה את דמי הכיס הגדולים ביותר? (מקסימום + נלווה + None)",
        difficulty: "בינוני-גבוה - תבנית מקסימום עם נתון נלווה וטיפול בקלט ריק",
        story: "כתבו תוכנית הקולטת זוגות של נתונים: מי ההורה שנתן דמי כיס ('Mother' או 'Father', או '-1' לעצירה) ואת סכום דמי הכיס שנתן (float). בסיום, אם הוזנו נתונים, התוכנית תדפיס איזה הורה נתן את הסכום הבודד הגדול ביותר. אם לא הוזנו נתונים כלל, תדפיס 'No data'.",
        stage1: {
          questionInput: "איך נאתחל את משתנה המקסימום `max_allowance` לפני הלולאה ומדוע?",
          optionsInput: [
            { id: "a", text: "נאתחל ל-None, כדי שנוכל לדעת בסוף אם הקלט היה ריק וגם לעדכן אותו אוטומטית בסיבוב הראשון", correct: true, feedback: "מצוין! אתחול ל-None פותר לנו גם את מקרה הקצה של קלט ריק וגם חוסך ניחוש של מספר התחלתי." },
            { id: "b", text: "נאתחל ל-0 תמיד", correct: false, feedback: "אם נאתחל ל-0 והקלט יהיה ריק (או שההורים נתנו 0 ש\"ח), לא נוכל להבחין בין קלט ריק לבין קלט של 0." }
          ],
          questionPattern: "מדוע התנאי `if allowance > max_allowance or max_allowance == None:` יקרוס בסיבוב הראשון?",
          optionsPattern: [
            { id: "p1", text: "כי פייתון מחשבת משמאל לימין! בסיבוב הראשון היא תנסה לבדוק אם מספר גדול מ-None ותקרוס עם TypeError.", correct: true, feedback: "הבנה עמוקה של שיעור 2 ו-4! חובה לכתוב קודם max_allowance == None משמאל ל-or, כדי שבסיבוב הראשון הביטוי ייעצר מיד ב-True (Short-circuit)." },
            { id: "p2", text: "כי צריך להשתמש ב-and במקום ב-or", correct: false, feedback: "אם נכתוב and, לעולם לא נעדכן החל מהסיבוב השני (כי max_allowance כבר לא יהיה None)." }
          ]
        },
        stage2: [
          { stepTitle: "קליטת ההורה הראשון ואתחול המקסימום ל-None", explanation: "קולטים רק את parent לפני הלולאה כי רק בו יכול להופיע '-1'.", skeleton: "parent = input('Enter parent (-1 to stop): ')\nmax_allowance = None" },
          { stepTitle: "לולאת ה-while והשלמת הזוג", explanation: "כל עוד parent אינו '-1', קולטים את סכום דמי הכיס כ-float.", skeleton: "while parent != '-1':\n    allowance = float(input('Enter allowance: '))" },
          { stepTitle: "תנאי המקסימום + שמירת ההורה הנלווה", explanation: "אם זה הסיבוב הראשון (None) או שדמי הכיס גדולים מהשיא עד כה, מעדכנים גם את השיא וגם את ההורה!", skeleton: "    if max_allowance == None or allowance > max_allowance:\n        max_allowance = allowance\n        max_parent = parent" },
          { stepTitle: "קליטה חוזרת ובדיקת קלט ריק בסיום", explanation: "קולטים את ההורה הבא, ומחוץ ללולאה בודקים אם נקלטו נתונים.", skeleton: "    parent = input('Enter parent (-1 to stop): ')\nif max_allowance != None:\n    print(max_parent)\nelse:\n    print('No data')" }
        ],
        stage3: [
          {
            lineNum: 1,
            prompt: "אתחול משתנה המקסימום לפני הלולאה ופתיחת ה-while:",
            codePrefix: "parent = input('Enter parent (-1 to stop): ')\nmax_allowance = ",
            codeSuffix: "\nwhile parent != '-1':",
            options: ["None", "0", "False"],
            correct: "None",
            hint: "הערך המיוחד שמייצג 'עדיין לא נקלט אף ערך'."
          },
          {
            lineNum: 2,
            prompt: "קליטת דמי הכיס ובדיקת תנאי המקסימום (שימו לב לסדר הנכון משמאל לימין!):",
            codePrefix: "    allowance = float(input('Enter allowance: '))\n    if ",
            codeSuffix: ":",
            options: [
              "max_allowance == None or allowance > max_allowance",
              "allowance > max_allowance or max_allowance == None",
              "max_allowance == None and allowance > max_allowance"
            ],
            correct: "max_allowance == None or allowance > max_allowance",
            hint: "קודם בודקים אם זה הסיבוב הראשון (== None), או שהסכום הנוכחי גדול מהשיא."
          },
          {
            lineNum: 3,
            prompt: "בתוך ה-if: עדכון המקסימום וגם שמירת הנתון הנלווה (ההורה):",
            codePrefix: "        max_allowance = allowance\n        ",
            codeSuffix: "\n    parent = input('Enter parent (-1 to stop): ')",
            options: ["max_parent = parent", "parent = max_parent", "max_parent = allowance"],
            correct: "max_parent = parent",
            hint: "שומרים את שם ההורה הנוכחי בתוך המשתנה max_parent."
          }
        ],
        stage4: {
          codeLines: [
            "parent = input('Enter parent (-1 to stop): ')",
            "max_allowance = None",
            "while parent != '-1':",
            "    allowance = float(input('Enter allowance: '))",
            "    if max_allowance == None or allowance > max_allowance:",
            "        max_allowance = allowance",
            "        max_parent = parent",
            "    parent = input('Enter parent (-1 to stop): ')",
            "if max_allowance != None:",
            "    print('Largest amount given by:', max_parent)",
            "else:",
            "    print('No data')"
          ],
          scenarios: [
            {
              name: "הרצה: Father (15), Mother (7), Mother (22), עצירה (-1)",
              steps: [
                { line: 1, vars: { parent: "'Father'", max_allowance: "None" }, output: "", note: "נקלט 'Father', ו-max_allowance מאותחל ל-None." },
                { line: 3, vars: { parent: "'Father'", max_allowance: "None", allowance: "15.0" }, output: "Enter allowance: 15", note: "סיבוב 1: נקלט סכום 15.0." },
                { line: 4, vars: { parent: "'Father'", max_allowance: "None", allowance: "15.0" }, output: "", note: "בדיקה: max_allowance == None מחזיר True! בגלל קשר or, הצד הימני כלל לא מחושב!" },
                { line: 6, vars: { parent: "'Father'", max_allowance: "15.0", allowance: "15.0", max_parent: "'Father'" }, output: "", note: "השיא מתעדכן ל-15.0, וההורה המוביל כרגע הוא 'Father'." },
                { line: 7, vars: { parent: "'Mother'", max_allowance: "15.0", allowance: "15.0", max_parent: "'Father'" }, output: "Enter parent: Mother", note: "נקלט ההורה הבא: 'Mother'." },
                { line: 3, vars: { parent: "'Mother'", max_allowance: "15.0", allowance: "7.0", max_parent: "'Father'" }, output: "Enter allowance: 7", note: "סיבוב 2: אמא נתנה 7.0." },
                { line: 4, vars: { parent: "'Mother'", max_allowance: "15.0", allowance: "7.0", max_parent: "'Father'" }, output: "", note: "האם max_allowance == None? False. האם 7.0 > 15.0? False. לא מעדכנים כלום!" },
                { line: 7, vars: { parent: "'Mother'", max_allowance: "15.0", allowance: "7.0", max_parent: "'Father'" }, output: "Enter parent: Mother", note: "שוב 'Mother'." },
                { line: 3, vars: { parent: "'Mother'", max_allowance: "15.0", allowance: "22.0", max_parent: "'Father'" }, output: "Enter allowance: 22", note: "סיבוב 3: אמא נתנה 22.0!" },
                { line: 6, vars: { parent: "'Mother'", max_allowance: "22.0", allowance: "22.0", max_parent: "'Mother'" }, output: "", note: "22.0 > 15.0 הוא True! לכן השיא מתעדכן ל-22.0 ו-max_parent מתעדכן ל-'Mother'." },
                { line: 7, vars: { parent: "'-1'", max_allowance: "22.0", allowance: "22.0", max_parent: "'Mother'" }, output: "Enter parent: -1", note: "הוזן '-1' לעצירה." },
                { line: 9, vars: { parent: "'-1'", max_allowance: "22.0", allowance: "22.0", max_parent: "'Mother'" }, output: "Largest amount given by: Mother", note: "הלולאה הסתיימה, max_allowance אינו None ולכן מודפס 'Mother'." }
              ]
            },
            {
              name: "מקרה קצה: קלט ריק ('-1' כבר בהתחלה)",
              steps: [
                { line: 1, vars: { parent: "'-1'", max_allowance: "None" }, output: "Enter parent: -1", note: "המשתמשת הזינה '-1' מיד בהתחלה." },
                { line: 2, vars: { parent: "'-1'", max_allowance: "None" }, output: "", note: "תנאי ה-while מחזיר False מיד! לא נכנסים ללולאה כלל." },
                { line: 8, vars: { parent: "'-1'", max_allowance: "None" }, output: "", note: "האם max_allowance != None? False (כי הוא נשאר None)." },
                { line: 11, vars: { parent: "'-1'", max_allowance: "None" }, output: "No data", note: "מדפיסים בבטחה 'No data' בלי שום שגיאת זמן ריצה!" }
              ]
            }
          ]
        }
      },
      {
        id: "ex4_2",
        title: "חשדה של דניאלה: האם דמי הכיס עלו כל שנה? (תבנית 'הקודם ל-' + אמת/שקר)",
        difficulty: "גבוה (רמת מבחן!) - שילוב prev, דגל increasing, וסיבוב ראשון",
        story: "כתבו תוכנית הקולטת סכומי דמי כיס שנתיים בזה אחר זה עד שמוזן 'q'. התוכנית תבדוק האם בכל שנה דמי הכיס היו גדולים ממש מהשנה שקדמה לה (סדרה עולה ממש). אם נמצאה הפרה, הלולאה תיעצר מיד (בלי לקלוט עוד מספרים ובלי break!) ותדפיס False. אם כל המספרים עלו עד 'q', תדפיס True.",
        stage1: {
          questionInput: "איך נטפל בסיבוב הראשון שבו נקלט המספר הראשון ועדיין אין לו 'מספר קודם' להשוות אליו?",
          optionsInput: [
            { id: "a", text: "נאתחל prev = None לפני הלולאה, ונבדוק ירידה רק אם prev != None", correct: true, feedback: "גאוני! בסיבוב הראשון prev הוא None, לכן התנאי prev != None and num <= prev ידלג על ההשוואה, ורק בסוף הסיבוב הראשון נשמור prev = num." },
            { id: "b", text: "נאתחל prev = 0 לפני הלולאה", correct: false, feedback: "מסוכן! אם המספר הראשון שנקלט הוא 0 או שלילי, התוכנית תחשוב בטעות שהוא ירד ביחס ל-0!" }
          ],
          questionPattern: "באיזה מיקום מדויק בגוף הלולאה חובה לעדכן את `prev = num`?",
          optionsPattern: [
            { id: "p1", text: "ממש בסוף הסיבוב — אחרי שסיימנו להשוות את num הנוכחי ל-prev הישן, ושנייה אחת לפני שקולטים את ה-num החדש!", correct: true, feedback: "זהו כלל הזהב של תבנית 'הקודם ל-': משווים את הנוכחי לקודם, ואז הנוכחי הופך להיות 'הקודם' עבור הסיבוב הבא!" },
            { id: "p2", text: "בשורה הראשונה של גוף הלולאה, מיד אחרי ההמרה ל-float", correct: false, feedback: "אם נכתוב prev = num בתחילת הלולאה, נדרוס את הקודם ומיד נשווה את num לעצמו!" }
          ]
        },
        stage2: [
          { stepTitle: "אתחול prev, דגל אמת/שקר וקליטה ראשונה", explanation: "נאתחל prev = None ו-increasing = True (מניחים שהסדרה עולה עד שיוכח אחרת).", skeleton: "num = input('Enter number, q to stop: ')\nprev = None\nincreasing = True" },
          { stepTitle: "לולאה המשלבת דגל ותנאי עצירה", explanation: "רצים כל עוד increasing הוא True וגם לא הוקלד 'q'.", skeleton: "while increasing and num != 'q':\n    num = float(num)" },
          { stepTitle: "בדיקת הפרה של סדר עולה (החל מהמספר השני)", explanation: "אם כבר יש קודם (prev != None) והנוכחי קטן או שווה לקודם -> מכבים את הדגל וקופצים עם continue!", skeleton: "    if prev != None and num <= prev:\n        increasing = False\n        continue" },
          { stepTitle: "שמירת הקודם וקליטת הבא", explanation: "שנייה לפני קליטת הבא, שומרים את הנוכחי בתוך prev.", skeleton: "    prev = num\n    num = input('Enter number, q to stop: ')\nprint(increasing)" }
        ],
        stage3: [
          {
            lineNum: 1,
            prompt: "אתחול המשתנים לפני הלולאה (הקודם ודגל אמת/שקר):",
            codePrefix: "num = input('Please enter any number, q to stop: ')\nprev = None\nincreasing = ",
            codeSuffix: "\nwhile increasing and num != 'q':",
            options: ["True", "False", "None"],
            correct: "True",
            hint: "בתבנית 'האם כולם מקיימים תנאי', מתחילים בהנחה אופטימית (True)."
          },
          {
            lineNum: 2,
            prompt: "בתוך הלולאה: בדיקה האם יש כבר איבר קודם והאם חלה אי-עלייה (num <= prev):",
            codePrefix: "    num = float(num)\n    if ",
            codeSuffix: ":\n        increasing = False\n        continue",
            options: [
              "prev != None and num <= prev",
              "num <= prev and prev != None",
              "prev == None or num <= prev"
            ],
            correct: "prev != None and num <= prev",
            hint: "חובה לבדוק קודם ש-prev != None משמאל ל-and כדי לא להשוות ל-None בסיבוב הראשון!"
          },
          {
            lineNum: 3,
            prompt: "שנייה לפני קליטת המספר הבא — שומרים את המספר הנוכחי בתור הקודם:",
            codePrefix: "    ",
            codeSuffix: "\n    num = input('Please enter any number, q to stop: ')\nprint(increasing)",
            options: ["prev = num", "num = prev", "prev = float(num)"],
            correct: "prev = num",
            hint: "מציבים את הערך של num הנוכחי לתוך הקופסה prev."
          }
        ],
        stage4: {
          codeLines: [
            "num = input('Please enter any number, q to stop: ')",
            "prev = None",
            "increasing = True",
            "while increasing and num != 'q':",
            "    num = float(num)",
            "    if prev != None and num <= prev:",
            "        increasing = False",
            "        continue",
            "    prev = num",
            "    num = input('Please enter any number, q to stop: ')",
            "print(increasing)"
          ],
          scenarios: [
            {
              name: "סדרה שנשברת: 7, 8, 9, ואז 6",
              steps: [
                { line: 2, vars: { num: "'7'", prev: "None", increasing: "True" }, output: "", note: "התחלה: נקלט '7', prev הוא None, ו-increasing הוא True." },
                { line: 4, vars: { num: "7.0", prev: "None", increasing: "True" }, output: "", note: "סיבוב 1: '7' מומר ל-7.0." },
                { line: 5, vars: { num: "7.0", prev: "None", increasing: "True" }, output: "", note: "בדיקה: prev != None הוא False! בגלל קשר and, לא בודקים את num <= prev." },
                { line: 8, vars: { num: "7.0", prev: "7.0", increasing: "True" }, output: "", note: "שומרים את 7.0 בתור prev לקראת הסיבוב הבא!" },
                { line: 9, vars: { num: "'8'", prev: "7.0", increasing: "True" }, output: "Enter number: 8", note: "נקלט '8'." },
                { line: 5, vars: { num: "8.0", prev: "7.0", increasing: "True" }, output: "", note: "סיבוב 2: כעת prev != None הוא True, אבל 8.0 <= 7.0 הוא False (יש עלייה!)." },
                { line: 8, vars: { num: "8.0", prev: "8.0", increasing: "True" }, output: "", note: "prev מתעדכן מ-7.0 ל-8.0." },
                { line: 9, vars: { num: "'9'", prev: "8.0", increasing: "True" }, output: "Enter number: 9", note: "נקלט '9'. בסיבוב 3 גם הוא עולה (9.0 > 8.0) ו-prev הופך ל-9.0." },
                { line: 9, vars: { num: "'6'", prev: "9.0", increasing: "True" }, output: "Enter number: 6", note: "נקלט '6'!" },
                { line: 5, vars: { num: "6.0", prev: "9.0", increasing: "True" }, output: "", note: "סיבוב 4: prev != None (True) וגם 6.0 <= 9.0 (True)! נמצאה שבירה של הסדרה!" },
                { line: 6, vars: { num: "6.0", prev: "9.0", increasing: "False" }, output: "", note: "הדגל increasing הופך ל-False." },
                { line: 7, vars: { num: "6.0", prev: "9.0", increasing: "False" }, output: "", note: "continue מדלגת על קליטת מספר נוסף ומחזירה אותנו מיד לשורת ה-while!" },
                { line: 3, vars: { num: "6.0", prev: "9.0", increasing: "False" }, output: "", note: "ב-while: מאחר ש-increasing הוא False, יוצאים מהלולאה!" },
                { line: 10, vars: { num: "6.0", prev: "9.0", increasing: "False" }, output: "False", note: "מודפס False." }
              ]
            }
          ]
        }
      },
      {
        id: "ex4_3",
        title: "הרצף הארוך ביותר של מספרים חיוביים (תבנית רצף רצוף)",
        difficulty: "גבוה - שילוב current_count מול max_count",
        story: "כתבו תוכנית הקולטת מספרים בזה אחר זה עד 'q', ומדפיסה את אורכו של הרצף הרצוף הארוך ביותר של מספרים חיוביים (גדולים מ-0). למשל עבור הקלט: 5, 6, -2, 3, 4, 8, 'q' התוכנית תדפיס 3 (בגלל הרצף 3, 4, 8).",
        stage1: {
          questionInput: "כמה משתני מנייה/שיא אנחנו צריכים בתבנית 'רצף רצוף' ומה תפקידם?",
          optionsInput: [
            { id: "a", text: "שניים: current_count (מונה את הרצף הנוכחי ומתאפס ל-0 כשנקלט מספר לא חיובי) ו-max_count (שומר את השיא של כל הזמנים ולא מתאפס!)", correct: true, feedback: "בול! זה כל הקסם של תבנית רצף רצוף: אחד שסופר את הרצף החי כרגע ומתאפס ברגע של כישלון, ואחד ששומר את השיא הגבוה ביותר שהגענו אליו." },
            { id: "b", text: "משתנה אחד בלבד שמוסיף 1 על כל מספר חיובי", correct: false, feedback: "משתנה אחד כזה יספור כמה חיוביים היו בסך הכל (5 בדוגמה שלנו), ולא את הרצף הרצוף הארוך ביותר (3)." }
          ],
          questionPattern: "האם בתבנית רצף רצוף צריך לאתחל את `max_count` ל-`None` או ל-`0`?",
          optionsPattern: [
            { id: "p1", text: "אפשר לאתחל פשוט ל-0! כי גם אם הקלט ריק או שאין אף מספר חיובי, אורך הרצף הארוך ביותר הוא באמת 0.", correct: true, feedback: "הבחנה מצוינת מהרשימות של עופר! כאן 0 הוא תשובה הגיונית ונכונה גם למקרי הקצה." },
            { id: "p2", text: "חובה לאתחל ל-1-", correct: false, feedback: "אין צורך ב-1-, אורך רצף מתחיל מ-0." }
          ]
        },
        stage2: [
          { stepTitle: "אתחול שני המשתנים ל-0 וקליטה ראשונה", explanation: "גם הרצף הנוכחי וגם שיא הרצפים מתחילים ב-0.", skeleton: "num = input('Enter number, q to stop: ')\ncurrent_count = 0\nmax_count = 0" },
          { stepTitle: "עדכון או איפוס הרצף הנוכחי (if-else)", explanation: "אם המספר חיובי מגדילים את current_count ב-1, אחרת מאפסים את current_count ל-0!", skeleton: "while num != 'q':\n    num = float(num)\n    if num > 0:\n        current_count += 1\n    else:\n        current_count = 0" },
          { stepTitle: "בדיקת שבירת שיא וקליטה חוזרת", explanation: "בודקים אם הרצף הנוכחי עקף את שיא הרצפים max_count.", skeleton: "    if current_count > max_count:\n        max_count = current_count\n    num = input('Enter number, q to stop: ')\nprint(max_count)" }
        ],
        stage3: [
          {
            lineNum: 1,
            prompt: "אם המספר חיובי מגדילים את הרצף הנוכחי ב-1, ואם לא (else) — מה עושים לרצף הנוכחי?",
            codePrefix: "num = input('Enter number, q to stop: ')\ncurrent_count = 0\nmax_count = 0\nwhile num != 'q':\n    num = float(num)\n    if num > 0:\n        current_count += 1\n    else:\n        ",
            codeSuffix: "",
            options: ["current_count = 0", "max_count = 0", "current_count -= 1"],
            correct: "current_count = 0",
            hint: "הרצף נקטע! לכן מונה הרצף הנוכחי חוזר ל-0 (אבל השיא max_count נשמר!)."
          },
          {
            lineNum: 2,
            prompt: "בדיקה האם הרצף הנוכחי שבר את שיא הרצפים שנמצא עד כה:",
            codePrefix: "    if ",
            codeSuffix: ":\n        max_count = current_count\n    num = input('Enter number, q to stop: ')\nprint(max_count)",
            options: ["current_count > max_count", "num > max_count", "current_count == 0"],
            correct: "current_count > max_count",
            hint: "משווים את אורך הרצף הנוכחי לשיא האורכים הקודם."
          }
        ],
        stage4: {
          codeLines: [
            "num = input('Enter number, q to stop: ')",
            "current_count = 0",
            "max_count = 0",
            "while num != 'q':",
            "    num = float(num)",
            "    if num > 0:",
            "        current_count += 1",
            "    else:",
            "        current_count = 0",
            "    if current_count > max_count:",
            "        max_count = current_count",
            "    num = input('Enter number, q to stop: ')",
            "print(max_count)"
          ],
          scenarios: [
            {
              name: "הרצה על הסדרה: 5, 6, -2, 3, 4, 8",
              steps: [
                { line: 2, vars: { num: "'5'", current_count: "0", max_count: "0" }, output: "", note: "התחלה: נקלט '5', שני המונים על 0." },
                { line: 10, vars: { num: "5.0", current_count: "1", max_count: "1" }, output: "", note: "עבור 5.0 (חיובי): current_count עולה ל-1, וגם max_count מתעדכן ל-1." },
                { line: 10, vars: { num: "6.0", current_count: "2", max_count: "2" }, output: "", note: "עבור 6.0 (חיובי שני ברצף): current_count עולה ל-2, ו-max_count עולה ל-2." },
                { line: 8, vars: { num: "-2.0", current_count: "0", max_count: "2" }, output: "", note: "נקלט -2.0! הרצף נקטע: current_count מתאפס ל-0, אבל max_count זוכר את ה-2!" },
                { line: 10, vars: { num: "3.0", current_count: "1", max_count: "2" }, output: "", note: "עבור 3.0: רצף חדש מתחיל! current_count הוא 1 (עדיין לא גדול מ-max_count שהוא 2)." },
                { line: 10, vars: { num: "4.0", current_count: "2", max_count: "2" }, output: "", note: "עבור 4.0: current_count עולה ל-2 (שווה ל-2, לא גדול מ-2)." },
                { line: 10, vars: { num: "8.0", current_count: "3", max_count: "3" }, output: "", note: "עבור 8.0: current_count עולה ל-3! עכשיו 3 > 2 ולכן השיא max_count נשבר ומתעדכן ל-3!" },
                { line: 12, vars: { num: "'q'", current_count: "3", max_count: "3" }, output: "3", note: "נקלט 'q', הלולאה מסתיימת ומודפס 3." }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: "שיעור 5: כתיבת פונקציות (def ו-return)",
    subtitle: "פרמטרים, החזרת ערך (return) כתחליף ל-break, ערכי ברירת מחדל וקריאה לפונקציה מפונקציה",
    icon: "⚙️",
    color: "rose",
    analogyTitle: "אנלוגיית מכונת הקפה במפעל",
    analogyText: "פונקציה שאנחנו כותבים בעצמנו (עם המילה def) היא כמו מכונה סגורה במפעל: דרך הפתחים למעלה (הפרמטרים בסוגריים) מזינים לה חומרי גלם, בפנים היא מבצעת חישוב או לולאה, ובסוף היא פולטת החוצה תוצאה מוכנה דרך פתח היציאה (return). שימו לב: כתיבת ה-def היא רק שרטוט המכונה! המכונה לא תפעל עד שנזמן אותה (Function Call) ונעביר לה ארגומנטים.",
    goldenRules: [
      { title: "return קוטעת את הפונקציה מיד (ומחליפה break!)", desc: "ברגע שפייתון מבצעת שורת return, הפונקציה מסתיימת מיד ומחזירה את הערך למקום שממנו נקראה! לכן בתוך פונקציה, return בתוך לולאה עוצר גם את הלולאה וגם את הפונקציה (ואין צורך ב-break או ב-else אחריו)." },
      { title: "הבדל בין return לבין print", desc: "print רק מציגה טקסט על המסך לעיני המשתמש, אך אינה מעבירה ערך להמשך החישוב בתוכנית. ברוב מוחלט של הפונקציות במבחן נרצה להחזיר תוצאה עם return." },
      { title: "פרמטרים עם ערך ברירת מחדל", desc: "אפשר להגדיר def func(x, y = 8): כך שאם לא יועבר ארגומנט שני בזימון, y יהיה 8. כלל ברזל: כל הפרמטרים בלי ערך ברירת מחדל חייבים לבוא לפני הפרמטרים עם ערך ברירת מחדל!" },
      { title: "קריאה לפונקציה מתוך פונקציה", desc: "פונקציה א' יכולה לקרוא לפונקציה ב', לשמור את ערך ההחזרה שלה במשתנה, ולהמשיך לעבד אותו (כמו computeGrade בתוך updateGrades)." }
    ],
    exercises: [
      {
        id: "ex5_1",
        title: "קליטת מספר חיובי עם הגבלת ניסיונות (return במקום break)",
        difficulty: "בינוני - שימוש ב-return ליציאה מיידית מלולאה",
        story: "כתבו פונקציה `get_positive_number(request, times)` המקבלת מחרוזת בקשה (`request`) ומספר ניסיונות מרבי (`times`). הפונקציה מבקשת מהמשתמשת מספר עשרוני שוב ושוב (עד `times` פעמים). ברגע שהמשתמשת מזינה מספר חיובי (> 0), הפונקציה מחזירה אותו מיד ומסתיימת! אם נגמרו כל הניסיונות ועדיין לא הוזן מספר חיובי, הפונקציה תחזיר `None`.",
        stage1: {
          questionInput: "מה קורה ברגע שמתבצעת ההוראה `return num` בתוך לולאת ה-while שבפונקציה?",
          optionsInput: [
            { id: "a", text: "גם הלולאה וגם הפונקציה כולה נעצרות מיד, והערך ב-num מוחזר למקום שממנו קראו לפונקציה!", correct: true, feedback: "מדויק! כמו שעופר הדגיש בשיעור 5: return בתוך פונקציה מחליף את break כי הוא מוציא אותנו מיד מהפונקציה כולה." },
            { id: "b", text: "הפונקציה ממשיכה לסיבוב הבא של הלולאה ובסוף מחזירה את כל המספרים", correct: false, feedback: "לא! return קוטע את ביצוע הפונקציה באותה שנייה." }
          ],
          questionPattern: "אם הלולאה `while count < times:` הסתיימה באופן טבעי (כלומר הגענו לשורה שאחרי הלולאה), מה אנחנו יודעים בוודאות?",
          optionsPattern: [
            { id: "p1", text: "שכל הניסיונות נוצלו ואף פעם לא הוזן מספר חיובי (אחרת היינו יוצאים כבר עם return num!). לכן פשוט נכתוב return None.", correct: true, feedback: "חשיבה נקייה ומבריקה! לא צריך שום if אחרי הלולאה — עצם זה שהגענו לשם אומר שלא בוצע return num באף סיבוב." },
            { id: "p2", text: "שצריך לבדוק עם if האם המספר האחרון היה חיובי", correct: false, feedback: "אין צורך, כי אם הוא היה חיובי כבר היינו מחזירים אותו בתוך הלולאה." }
          ]
        },
        stage2: [
          { stepTitle: "כותרת הפונקציה (def) ואתחול מונה ניסיונות", explanation: "נגדיר את הפונקציה עם שני הפרמטרים שלה, ונאתחל מונה סיבובים count = 0.", skeleton: "def get_positive_number(request, times):\n    count = 0" },
          { stepTitle: "לולאת הניסיונות ובדיקת חיוביות", explanation: "כל עוד count < times, נקלוט מספר עם ההודעה request. אם הוא חיובי — נחזיר אותו מיד!", skeleton: "    while count < times:\n        num = float(input(request))\n        if num > 0:\n            return num\n        count = count + 1" },
          { stepTitle: "החזרת None במקרה של כישלון", explanation: "אם יצאנו מהלולאה בלי להחזיר מספר, נחזיר None.", skeleton: "    return None" }
        ],
        stage3: [
          {
            lineNum: 1,
            prompt: "הגדרת כותרת הפונקציה עם שני הפרמטרים:",
            codePrefix: "",
            codeSuffix: " get_positive_number(request, times):\n    count = 0",
            options: ["def", "function", "return"],
            correct: "def",
            hint: "המילה השמורה בפייתון להגדרת פונקציה חדשה."
          },
          {
            lineNum: 2,
            prompt: "בתוך לולאת הניסיונות: אם המספר שנקלט גדול מ-0, החזירו אותו מיד (בלי break!):",
            codePrefix: "    while count < times:\n        num = float(input(request))\n        if num > 0:\n            ",
            codeSuffix: "\n        count = count + 1",
            options: ["return num", "print(num)", "break num"],
            correct: "return num",
            hint: "הפקודה שמחזירה ערך מהפונקציה ומסיימת את ריצתה."
          },
          {
            lineNum: 3,
            prompt: "מחוץ ללולאת ה-while (אם נגמרו כל הניסיונות ללא הצלחה):",
            codePrefix: "    ",
            codeSuffix: "\n\nresult = get_positive_number('Enter positive: ', 2)\nprint(result)",
            options: ["return None", "print(None)", "return 0"],
            correct: "return None",
            hint: "מחזירים את הערך המיוחד None."
          }
        ],
        stage4: {
          codeLines: [
            "def get_positive_number(request, times):",
            "    count = 0",
            "    while count < times:",
            "        num = float(input(request))",
            "        if num > 0:",
            "            return num",
            "        count = count + 1",
            "    return None",
            "result = get_positive_number('Enter positive: ', 2)",
            "print(result)"
          ],
          scenarios: [
            {
              name: "הצלחה בניסיון השני (קלט: -5 ואז 12)",
              steps: [
                { line: 0, vars: {}, output: "", note: "פייתון רושמת לעצמה את הגדרת הפונקציה (עדיין לא מריצה את גוף הפונקציה!)." },
                { line: 8, vars: { request: "'Enter positive: '", times: "2" }, output: "", note: "קריאה לפונקציה! הארגומנטים מועברים לפרמטרים request ו-times." },
                { line: 1, vars: { request: "'Enter positive: '", times: "2", count: "0" }, output: "", note: "בתוך הפונקציה: count מאותחל ל-0." },
                { line: 2, vars: { request: "'Enter positive: '", times: "2", count: "0" }, output: "", note: "0 < 2 הוא True. נכנסים לניסיון הראשון." },
                { line: 3, vars: { request: "'Enter positive: '", times: "2", count: "0", num: "-5.0" }, output: "Enter positive: -5", note: "המשתמשת הזינה -5.0." },
                { line: 4, vars: { request: "'Enter positive: '", times: "2", count: "0", num: "-5.0" }, output: "", note: "האם -5.0 > 0? False. לא מבצעים return." },
                { line: 6, vars: { request: "'Enter positive: '", times: "2", count: "1", num: "-5.0" }, output: "", note: "count עולה ל-1." },
                { line: 3, vars: { request: "'Enter positive: '", times: "2", count: "1", num: "12.0" }, output: "Enter positive: 12", note: "ניסיון שני (1 < 2): המשתמשת הזינה 12.0." },
                { line: 5, vars: { request: "'Enter positive: '", times: "2", count: "1", num: "12.0" }, output: "", note: "12.0 > 0 הוא True! מבצעים return 12.0 ויוצאים מיד מהפונקציה!" },
                { line: 9, vars: { result: "12.0" }, output: "12.0", note: "הערך 12.0 חזר ונשמר ב-result, ומודפס למסך." }
              ]
            },
            {
              name: "כישלון בכל הניסיונות (קלט: -3 ואז 0)",
              steps: [
                { line: 8, vars: { request: "'Enter positive: '", times: "2", count: "0" }, output: "", note: "קריאה לפונקציה עם times = 2." },
                { line: 6, vars: { request: "'Enter positive: '", times: "2", count: "1", num: "-3.0" }, output: "Enter positive: -3", note: "ניסיון 1: הוזן -3.0 (לא חיובי). count עולה ל-1." },
                { line: 6, vars: { request: "'Enter positive: '", times: "2", count: "2", num: "0.0" }, output: "Enter positive: 0", note: "ניסיון 2: הוזן 0.0 (לא גדול ממש מ-0). count עולה ל-2." },
                { line: 2, vars: { request: "'Enter positive: '", times: "2", count: "2", num: "0.0" }, output: "", note: "בדיקת ה-while: האם 2 < 2? False! הלולאה מסתיימת." },
                { line: 7, vars: { request: "'Enter positive: '", times: "2", count: "2", num: "0.0" }, output: "", note: "מגיעים לשורה שאחרי הלולאה ומבצעים return None!" },
                { line: 9, vars: { result: "None" }, output: "None", note: "הערך None נשמר ב-result ומודפס." }
              ]
            }
          ]
        }
      },
      {
        id: "ex5_2",
        title: "עדכון ציונים עם פקטור (קריאה לפונקציה מתוך פונקציה + מינימום + דגל)",
        difficulty: "גבוה (שאלת אינטגרציה ברמת מבחן!)",
        story: "נתונה הפונקציה `computeGrade(grade, factor)` שמחזירה את `grade + factor`, או `-1` אם הציון החדש גדול מ-100. כתבו את הפונקציה `updateGrades(factor)` שקולטת ציונים עד שמוזן 'quit' או עד ש-`computeGrade` מחזירה `-1` (ללא שימוש ב-break!). עבור כל ציון תקין תודפס התוצאה ויישמר הציון המינימלי (לפני או אחרי הפקטור לפי המימוש - כאן נשמור את הציון החדש המינימלי). בסיום הפונקציה תחזיר את המינימום.",
        stage1: {
          questionInput: "איך `updateGrades` תדע מה הציון לאחר הפקטור והאם הוא חרג מ-100?",
          optionsInput: [
            { id: "a", text: "היא תקרא לפונקציה computeGrade(grade, factor) ותשמור את ערך ההחזרה שלה במשתנה, למשל new_grade", correct: true, feedback: "מצוין! לא מחשבים שוב ידנית, אלא מזמנים את הפונקציה שכבר בנינו ושומרים את תוצאתה." },
            { id: "b", text: "היא תכתוב def computeGrade מחדש בתוך הלולאה", correct: false, feedback: "ממש לא! מגדירים פונקציה פעם אחת עם def, וקוראים לה בשמה כשרוצים להפעיל אותה." }
          ],
          questionPattern: "איך נעצור את הלולאה בלי `break` אם `new_grade == -1`?",
          optionsPattern: [
            { id: "p1", text: "נשתמש במשתנה דגל valid = True בתנאי הלולאה. אם new_grade == -1 נציב valid = False ונבצע continue!", correct: true, feedback: "שליטה מלאה בכל החומר של שיעורים 3, 4 ו-5! הדגל ו-continue עוצרים את הלולאה באלגנטיות בלי להדפיס את ה-1- ובלי לקלוט ציון נוסף." },
            { id: "p2", text: "נעשה return -1 מיד", correct: false, feedback: "שים לב! השאלה ביקשה שבגמר קליטת הציונים (גם אם נעצרה בגלל -1) הפונקציה תחזיר את הציון המינימלי שנמצא עד כה." }
          ]
        },
        stage2: [
          { stepTitle: "הגדרת updateGrades ואתחול מינימום ודגל", explanation: "נאתחל min_grade = None, דגל valid = True ונקלוט ציון ראשון כמחרוזת.", skeleton: "def updateGrades(factor):\n    min_grade = None\n    valid = True\n    grade = input('Enter grade (quit to stop): ')" },
          { stepTitle: "לולאת ה-while וקריאה ל-computeGrade", explanation: "נרוץ כל עוד valid ו-grade != 'quit'. נמיר את grade ונשלח אותו ל-computeGrade.", skeleton: "    while valid and grade != 'quit':\n        grade = float(grade)\n        new_grade = computeGrade(grade, factor)" },
          { stepTitle: "בדיקת חריגה (-1) מול עדכון מינימום", explanation: "אם חזר -1 נכבה את הדגל ונעשה continue. אחרת נדפיס, נעדכן מינימום ונקלוט את הבא.", skeleton: "        if new_grade == -1:\n            valid = False\n            continue\n        print(new_grade)\n        if min_grade == None or new_grade < min_grade:\n            min_grade = new_grade\n        grade = input('Enter grade (quit to stop): ')\n    return min_grade" }
        ],
        stage3: [
          {
            lineNum: 1,
            prompt: "קריאה לפונקציית העזר computeGrade בתוך הלולאה ושמירת תוצאתה:",
            codePrefix: "def updateGrades(factor):\n    min_grade = None\n    valid = True\n    grade = input('Enter grade: ')\n    while valid and grade != 'quit':\n        grade = float(grade)\n        new_grade = ",
            codeSuffix: "",
            options: ["computeGrade(grade, factor)", "def computeGrade(grade, factor)", "computeGrade(factor)"],
            correct: "computeGrade(grade, factor)",
            hint: "מזמנים את הפונקציה בשמה ומעבירים לה את הציון הנוכחי ואת הפקטור."
          },
          {
            lineNum: 2,
            prompt: "אם הפונקציה החזירה 1- (חריגה מ-100), נכבה את הדגל ונדלג לסיום הלולאה ללא break:",
            codePrefix: "        if new_grade == -1:\n            valid = False\n            ",
            codeSuffix: "\n        print(new_grade)",
            options: ["continue", "break", "return"],
            correct: "continue",
            hint: "הפקודה שמדלגת על שאר גוף הלולאה וחוזרת לבדיקת תנאי ה-while."
          },
          {
            lineNum: 3,
            prompt: "עדכון תבנית המינימום והחזרת המינימום בסוף הפונקציה:",
            codePrefix: "        if min_grade == None or new_grade < min_grade:\n            min_grade = new_grade\n        grade = input('Enter grade: ')\n    ",
            codeSuffix: "",
            options: ["return min_grade", "print(min_grade)", "return new_grade"],
            correct: "return min_grade",
            hint: "בסיום הפונקציה יש להחזיר את הציון המינימלי."
          }
        ],
        stage4: {
          codeLines: [
            "def computeGrade(grade, factor):",
            "    if grade + factor > 100:",
            "        return -1",
            "    return grade + factor",
            "",
            "def updateGrades(factor):",
            "    min_grade = None",
            "    valid = True",
            "    grade = input('Enter grade: ')",
            "    while valid and grade != 'quit':",
            "        grade = float(grade)",
            "        new_grade = computeGrade(grade, factor)",
            "        if new_grade == -1:",
            "            valid = False",
            "            continue",
            "        print(new_grade)",
            "        if min_grade == None or new_grade < min_grade:",
            "            min_grade = new_grade",
            "        grade = input('Enter grade: ')",
            "    return min_grade"
          ],
          scenarios: [
            {
              name: "updateGrades(10) עם ציונים: 80, 70, ואז 95 (שחורג מ-100!)",
              steps: [
                { line: 8, vars: { factor: "10", min_grade: "None", valid: "True", grade: "'80'" }, output: "Enter grade: 80", note: "הופעלה updateGrades(10). נקלט הציון הראשון '80'." },
                { line: 11, vars: { factor: "10", min_grade: "None", valid: "True", grade: "80.0", new_grade: "90.0" }, output: "", note: "computeGrade(80.0, 10) החזירה 90.0." },
                { line: 15, vars: { factor: "10", min_grade: "None", valid: "True", grade: "80.0", new_grade: "90.0" }, output: "90.0", note: "הודפס הציון המעודכן 90.0." },
                { line: 17, vars: { factor: "10", min_grade: "90.0", valid: "True", grade: "80.0", new_grade: "90.0" }, output: "", note: "min_grade היה None ולכן מתעדכן ל-90.0." },
                { line: 18, vars: { factor: "10", min_grade: "90.0", valid: "True", grade: "'70'", new_grade: "90.0" }, output: "Enter grade: 70", note: "נקלט '70'. בסיבוב השני computeGrade מחזירה 80.0, ו-min_grade מתעדכן ל-80.0!" },
                { line: 18, vars: { factor: "10", min_grade: "80.0", valid: "True", grade: "'95'", new_grade: "80.0" }, output: "Enter grade: 95", note: "נקלט '95'!" },
                { line: 11, vars: { factor: "10", min_grade: "80.0", valid: "True", grade: "95.0", new_grade: "-1" }, output: "", note: "95 + 10 > 100! לכן computeGrade מחזירה -1 לתוך new_grade." },
                { line: 13, vars: { factor: "10", min_grade: "80.0", valid: "False", grade: "95.0", new_grade: "-1" }, output: "", note: "new_grade == -1 מתקיים! valid הופך ל-False." },
                { line: 14, vars: { factor: "10", min_grade: "80.0", valid: "False", grade: "95.0", new_grade: "-1" }, output: "", note: "continue קופץ לראש ה-while (לא מדפיסים -1 ולא קולטים עוד ציון!)." },
                { line: 19, vars: { factor: "10", min_grade: "80.0", valid: "False", grade: "95.0", new_grade: "-1" }, output: "Returned: 80.0", note: "הלולאה נעצרת והפונקציה מחזירה את המינימום: 80.0." }
              ]
            }
          ]
        }
      }
    ]
  }
];

// ==========================================
// DATA: EXAM PATTERN FINDER (DECISION TREE)
// ==========================================
const PATTERN_FINDER_DATA = [
  {
    id: "pat_bool_all",
    questionPrompt: "שואלים אותי: 'האם כל הערכים מקיימים תנאי מסוים?' (למשל: האם כל המספרים חיוביים?)",
    patternName: "תבנית אמת/שקר (גרסת 'האם כולם')",
    analogy: "חוק החפות: מניחים שכולם בסדר (True), ומחפשים בלולאה אפילו עבריין אחד שמפר את התנאי כדי להעביר ל-False.",
    codeTemplate: `num = input("Enter number, q to stop: ")
all_ok = True
while num != 'q':
    num = float(num)
    if num <= 0:  # תנאי ההפרה!
        all_ok = False
    num = input("Enter number, q to stop: ")
print(all_ok)`,
    edgeCaseWarning: "שימו לב: לעולם אל תוסיפו else שמחזיר את הדגל ל-True! ברגע שהדגל הפך ל-False פעם אחת, הוא נשאר False עד הסוף. אם יש צורך להבחין בקלט ריק, מאתחלים ל-None ובסיבוב הראשון אם הוא None הופכים ל-True."
  },
  {
    id: "pat_bool_any",
    questionPrompt: "שואלים אותי: 'האם קיים לפחות ערך אחד שמקיים תנאי?' (למשל: האם אמא נתנה אי פעם דמי כיס?)",
    patternName: "תבנית אמת/שקר (גרסת 'האם קיים לפחות אחד')",
    analogy: "גלאי מתכות: מתחיל שקט (False). ברגע שהוא מצפצף פעם אחת (True), אנחנו יודעים שנמצא פריט מתכת.",
    codeTemplate: `parent = input("Enter parent, empty to stop: ")
found = False
while parent != "":
    if parent == "Mother":
        found = True
    parent = input("Enter parent, empty to stop: ")
print(found)`,
    edgeCaseWarning: "כדי לחסוך עדכונים מיותרים אחרי שכבר מצאנו, אפשר לבדוק: if not found and parent == 'Mother'."
  },
  {
    id: "pat_count_sum_avg",
    questionPrompt: "מבקשים ממני: 'לספור כמה מקרים...', 'לסכום את כל...', או 'לחשב ממוצע של...'",
    patternName: "תבנית מנייה + תבנית סכום (וחישוב ממוצע)",
    analogy: "קליקר של שומר בכניסה (+1 בכל פעם) וקופת חיסכון (+הסכום הנוכחי בכל פעם). שניהם מתחילים מאופסים ב-0!",
    codeTemplate: `num = input("Enter number, q to stop: ")
count = 0
total_sum = 0
while num != 'q':
    num = float(num)
    if num > 0:  # אם יש תנאי סינון
        count = count + 1
        total_sum = total_sum + num
    num = input("Enter number, q to stop: ")

if count > 0:
    print("Average:", total_sum / count)
else:
    print("No relevant numbers entered.")`,
    edgeCaseWarning: "סכנת חלוקה באפס (ZeroDivisionError)! בחישוב ממוצע, חובה לבדוק אחרי הלולאה if count > 0 לפני שמבצעים total_sum / count."
  },
  {
    id: "pat_max_min_sat",
    questionPrompt: "מבקשים ממני: 'למצוא את הגדול/הקטן ביותר' או 'מי האדם שקיבל את הציון/הזמן הגבוה ביותר'",
    patternName: "תבנית מקסימום/מינימום + נתון נלווה (Satellite Data)",
    analogy: "תחרות קפיצה לרוחק: הראשון שקופץ קובע אוטומטית את השיא הזמני (כי השיא התחיל כ-None). כל קופץ הבא שעובר את השיא, מעדכנים על הלוח גם את המרחק שלו וגם את השם שלו!",
    codeTemplate: `name = input("Enter name, -1 to stop: ")
max_grade = None
while name != "-1":
    grade = int(input("Enter grade: "))
    if max_grade == None or grade > max_grade:
        max_grade = grade
        max_name = name  # הנתון הנלווה!
    name = input("Enter name, -1 to stop: ")

if max_grade != None:
    print("Winner:", max_name, "with", max_grade)
else:
    print("No data")`,
    edgeCaseWarning: "חובה לכתוב max_grade == None משמאל ל-or! אם תכתבו grade > max_grade קודם, בסיבוב הראשון פייתון תנסה להשוות מספר ל-None ותקרוס."
  },
  {
    id: "pat_streak",
    questionPrompt: "מבקשים ממני: 'למצוא את אורך הרצף הרצוף הארוך ביותר של...'",
    patternName: "תבנית רצף רצוף (Current Streak vs Max Streak)",
    analogy: "משחק הקפצת כדור על הרגל: יש לך את הספירה של ההקפצות הנוכחיות (שמתאפסת ל-0 ברגע שהכדור נופל לרצפה), ויש לך את השיא האישי שלך שרשום בצד ומתעדכן רק כשאתה עוקף אותו.",
    codeTemplate: `num = input("Enter number, q to stop: ")
current_count = 0
max_count = 0
while num != 'q':
    num = float(num)
    if num > 0:
        current_count += 1
    else:
        current_count = 0  # הרצף נקטע!
    if current_count > max_count:
        max_count = current_count
    num = input("Enter number, q to stop: ")
print(max_count)`,
    edgeCaseWarning: "אל תתבלבלו בין current_count (שמתאפס ב-else) לבין max_count (שלעולם לא מתאפס!)."
  },
  {
    id: "pat_prev",
    questionPrompt: "מבקשים ממני: 'להשוות כל מספר למספר שקדם לו' (סדרה עולה, הפרש קבוע, שניים סמוכים זהים)",
    patternName: "תבנית 'הקודם ל-' (prev)",
    analogy: "זיכרון צילומי של צעד אחד אחורה: לפני שאתה פוגש את האדם הבא בתור, אתה שומר בפתק prev את האדם שעומד מולך כרגע.",
    codeTemplate: `num = input("Enter number, q to stop: ")
prev = None
increasing = True
while increasing and num != 'q':
    num = float(num)
    if prev != None and num <= prev:
        increasing = False
        continue
    prev = num  # שנייה לפני קליטת הבא!
    num = input("Enter number, q to stop: ")
print(increasing)`,
    edgeCaseWarning: "בסיבוב הראשון עדיין אין איבר קודם (prev הוא None), לכן תמיד בודקים if prev != None לפני שמשווים אליו!"
  }
];

// ==========================================
// DATA: INDEPENDENT GUIDED WRITING CHALLENGES
// ==========================================
const GUIDED_WRITING_CHALLENGES = [
  {
    id: "gw_1",
    title: "אימון עצמאי 1: בדיקת זוגיות של מספר",
    description: "כתבו תוכנית הקולטת מספר שלם מהמשתמשת, בודקת אם הוא זוגי או אי-זוגי, ומדפיסה 'even' או 'odd'.",
    steps: [
      {
        instruction: "צעד 1: קלטו מספר שלם לתוך משתנה בשם num (השתמשו ב-int וב-input).",
        expectedCheck: (line) => line.includes("num") && line.includes("=") && line.includes("int(") && line.includes("input("),
        sampleAnswer: 'num = int(input("Please enter an integer: "))',
        explanation: "מעולה! קלטנו מחרוזת מהמשתמשת והמרנו אותה למספר שלם ב-num."
      },
      {
        instruction: "צעד 2: כתבו שורת if הבודקת האם שארית החלוקה של num ב-2 שווה ל-0 (אל תשכחו נקודתיים בסוף!).",
        expectedCheck: (line) => line.trim().startsWith("if ") && line.includes("num % 2") && line.includes("==") && line.includes("0") && line.trim().endsWith(":"),
        sampleAnswer: "if num % 2 == 0:",
        explanation: "מדויק! האופרטור % מחזיר את השארית, ו-== בודק אם היא שווה ל-0."
      },
      {
        instruction: "צעד 3: הדפיסו 'even' בתוך גוף ה-if (עם הזחה של 4 רווחים או רגיל), ולאחר מכן הוסיפו else שמדפיס 'odd'.",
        expectedCheck: (line) => line.includes("print") && (line.includes("even") || line.includes("odd")),
        sampleAnswer: '    print("even")\nelse:\n    print("odd")',
        explanation: "כל הכבוד! כתבת תוכנית התניה מלאה מאפס על דף חלק!"
      }
    ]
  },
  {
    id: "gw_2",
    title: "אימון עצמאי 2: מניית סניפים שבהם קוטג' א' יקר מקוטג' ב'",
    description: "כתבו לולאת while הקולטת זוגות מחירים של שני מותגי קוטג' (brand1, brand2) עד שמוזן 'q' ב-brand1, וסופרת בכמה סניפים brand1 גדול מ-brand2.",
    steps: [
      {
        instruction: "צעד 1: אתחלו משתנה מונה בשם count ל-0, וקלטו את brand1 כמחרוזת (בלי float עדיין!).",
        expectedCheck: (line) => line.includes("0") || (line.includes("brand1") && line.includes("input")),
        sampleAnswer: 'count = 0\nbrand1 = input("Input price 1: ")',
        explanation: "יפה מאוד! המונה מאותחל ל-0 ו-brand1 נקלט כמחרוזת כדי לא לקרוס אם יוזן 'q'."
      },
      {
        instruction: "צעד 2: כתבו את שורת הפתיחה של לולאת ה-while שרצה כל עוד brand1 שונה מ-'q'.",
        expectedCheck: (line) => line.trim().startsWith("while ") && line.includes("brand1") && line.includes("!=") && line.trim().endsWith(":"),
        sampleAnswer: "while brand1 != 'q':",
        explanation: "מצוין! זהו תנאי ההמשך של תבנית א'."
      },
      {
        instruction: "צעד 3: בתוך הלולאה, המירו את brand1 ל-float, וקלטו את brand2 ישירות עם float(input(...)).",
        expectedCheck: (line) => line.includes("float("),
        sampleAnswer: '    brand1 = float(brand1)\n    brand2 = float(input("Input price 2: "))',
        explanation: "נהדר! עכשיו שני המחירים הם מספרים עשרוניים ואפשר להשוות ביניהם."
      },
      {
        instruction: "צעד 4: בדקו עם if האם brand1 > brand2, הגדילו את count ב-1, ובסוף הלולאה קלטו שוב את brand1 והדפיסו את count.",
        expectedCheck: (line) => line.includes("brand1 > brand2") || line.includes("count"),
        sampleAnswer: '    if brand1 > brand2:\n        count += 1\n    brand1 = input("Input price 1: ")\nprint(count)',
        explanation: "אלוף! בנית לולאת זוגות מלאה עם תבנית מנייה והמרה מושהה ממש מאפס!"
      }
    ]
  }
];

export default function App() {
  // Navigation & State
  const [activeTab, setActiveTab] = useState('workout'); // 'workout' | 'patterns' | 'blankpage'
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [currentStage, setCurrentStage] = useState(1); // 1, 2, 3, 4

  // Stage 1 state
  const [stage1Ans1, setStage1Ans1] = useState(null);
  const [stage1Ans2, setStage1Ans2] = useState(null);

  // Stage 2 state
  const [revealedSkeletonSteps, setRevealedSkeletonSteps] = useState(1);

  // Stage 3 state (line-by-line builder)
  const [stage3Selections, setStage3Selections] = useState({});
  const [stage3ActiveLine, setStage3ActiveLine] = useState(0);

  // Stage 4 state (trace table simulator)
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [traceStepIdx, setTraceStepIdx] = useState(0);

  // Pattern Finder state
  const [activePatternId, setActivePatternId] = useState(PATTERN_FINDER_DATA[0].id);

  // Blank Page Trainer state
  const [selectedChallengeIdx, setSelectedChallengeIdx] = useState(0);
  const [currentChallengeStep, setCurrentChallengeStep] = useState(0);
  const [userCodeInput, setUserCodeInput] = useState("");
  const [builtLines, setBuiltLines] = useState([]);
  const [stepFeedback, setStepFeedback] = useState(null);
  const [showGoldenRules, setShowGoldenRules] = useState(true);

  // Completed exercises tracker
  const [completedExercises, setCompletedExercises] = useState({});

  const currentLesson = LESSONS_DATA.find(l => l.id === selectedLessonId) || LESSONS_DATA[0];
  const currentExercise = currentLesson.exercises[selectedExerciseIndex] || currentLesson.exercises[0];

  // Reset exercise state when switching lesson or exercise
  const selectLessonAndExercise = (lessonId, exIdx = 0) => {
    setSelectedLessonId(lessonId);
    setSelectedExerciseIndex(exIdx);
    setCurrentStage(1);
    setStage1Ans1(null);
    setStage1Ans2(null);
    setRevealedSkeletonSteps(1);
    setStage3Selections({});
    setStage3ActiveLine(0);
    setSelectedScenarioIdx(0);
    setTraceStepIdx(0);
  };

  const handleStage3OptionSelect = (lineIdx, optionValue, correctValue) => {
    const isCorrect = optionValue === correctValue;
    setStage3Selections(prev => ({
      ...prev,
      [lineIdx]: { selected: optionValue, isCorrect }
    }));
    if (isCorrect && lineIdx === stage3ActiveLine && lineIdx < currentExercise.stage3.length - 1) {
      setTimeout(() => {
        setStage3ActiveLine(lineIdx + 1);
      }, 450);
    }
  };

  const isStage1Complete = () => {
    const opt1 = currentExercise.stage1.optionsInput.find(o => o.id === stage1Ans1);
    const opt2 = currentExercise.stage1.optionsPattern.find(o => o.id === stage1Ans2);
    return Boolean(opt1?.correct && opt2?.correct);
  };

  const isStage3Complete = () => {
    return currentExercise.stage3.every((_, idx) => stage3Selections[idx]?.isCorrect);
  };

  const markCurrentExerciseDone = () => {
    setCompletedExercises(prev => ({ ...prev, [currentExercise.id]: true }));
  };

  // Blank page trainer handler
  const currentChallenge = GUIDED_WRITING_CHALLENGES[selectedChallengeIdx];
  const handleCheckGuidedLine = () => {
    const stepObj = currentChallenge.steps[currentChallengeStep];
    if (!userCodeInput.trim()) return;
    if (stepObj.expectedCheck(userCodeInput)) {
      setBuiltLines(prev => [...prev, stepObj.sampleAnswer]);
      setStepFeedback({ type: 'success', text: stepObj.explanation });
      setUserCodeInput("");
      if (currentChallengeStep < currentChallenge.steps.length - 1) {
        setTimeout(() => {
          setCurrentChallengeStep(prev => prev + 1);
          setStepFeedback(null);
        }, 1200);
      }
    } else {
      setStepFeedback({
        type: 'hint',
        text: `כמעט! נסה לוודא שהשורה כוללת את המרכיבים הנדרשים, או לחץ על 'הצג לי את השורה לדוגמה' כדי ללמוד ממנה.`
      });
    }
  };

  const handleRevealGuidedLine = () => {
    const stepObj = currentChallenge.steps[currentChallengeStep];
    setBuiltLines(prev => [...prev, stepObj.sampleAnswer]);
    setStepFeedback({ type: 'success', text: stepObj.explanation });
    setUserCodeInput("");
    if (currentChallengeStep < currentChallenge.steps.length - 1) {
      setTimeout(() => {
        setCurrentChallengeStep(prev => prev + 1);
        setStepFeedback(null);
      }, 1200);
    }
  };

  const currentScenario = currentExercise.stage4.scenarios[selectedScenarioIdx] || currentExercise.stage4.scenarios[0];
  const currentTraceStep = currentScenario.steps[traceStepIdx] || currentScenario.steps[0];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* TOP HEADER */}
      <header className="bg-gradient-to-l from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-lg border-b border-indigo-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-2xl shadow-inner">
              🐍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">המנטור האישי לפייתון</h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  שיעורים 1–5 (קורס פרופ' עופר אליאור)
                </span>
              </div>
              <p className="text-indigo-200 text-sm mt-0.5">
                בונים את שריר חשיבת הקוד צעד-אחר-צעד — מנפצים יחד את פחד הדף הריק!
              </p>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <div className="flex bg-slate-900/60 p-1 rounded-xl border border-indigo-500/30">
            <button
              onClick={() => setActiveTab('workout')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'workout'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-indigo-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <Footprints className="w-4 h-4" />
              אימון מודרך (שלב-אחר-שלב)
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'patterns'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-indigo-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4" />
              מפענח שאלות מבחן
            </button>
            <button
              onClick={() => setActiveTab('blankpage')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'blankpage'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-indigo-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code className="w-4 h-4" />
              סימולטור דף חלק
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* ====================================================
            TAB 1: STEP-BY-STEP WORKOUT (LESSONS 1 TO 5)
        ==================================================== */}
        {activeTab === 'workout' && (
          <div className="space-y-6">
            {/* Lesson Selector Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {LESSONS_DATA.map((lesson) => {
                const isSelected = lesson.id === selectedLessonId;
                const doneCount = lesson.exercises.filter(e => completedExercises[e.id]).length;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => selectLessonAndExercise(lesson.id, 0)}
                    className={`text-right p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-indigo-600 ring-2 ring-indigo-600/20 shadow-md'
                        : 'bg-white/70 border-slate-200 hover:border-indigo-300 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">{lesson.icon}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          doneCount === lesson.exercises.length
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {doneCount}/{lesson.exercises.length} הושלמו
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 leading-snug">{lesson.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">{lesson.subtitle}</p>
                  </button>
                );
              })}
            </div>

            {/* Lesson Overview & Golden Rules Collapsible Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div 
                onClick={() => setShowGoldenRules(!showGoldenRules)}
                className="bg-gradient-to-l from-indigo-50/80 via-slate-50 to-white px-6 py-4 flex items-center justify-between cursor-pointer border-b border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base sm:text-lg">
                      {currentLesson.analogyTitle} — כללי הזהב של {currentLesson.title.split(':')[0]}
                    </h2>
                    <p className="text-xs text-slate-500">לחץ להצגה או הסתרה של סיכום העקרונות מהשיעור</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-700 p-1">
                  {showGoldenRules ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {showGoldenRules && (
                <div className="p-6 space-y-5">
                  <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-950 leading-relaxed flex gap-3 items-start">
                    <HeartHandshake className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-1 text-indigo-900">איך לדמיין את זה בחיים האמיתיים?</span>
                      {currentLesson.analogyText}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {currentLesson.goldenRules.map((rule, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
                        <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-1">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          {rule.title}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pr-7">{rule.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Exercise Selector & 4-Stage Step-by-Step Arena */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Exercise Header Bar */}
              <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 block mb-0.5">
                    תרגול מודרך מתוך השיעור והתרגול
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                    {currentExercise.title}
                    <span className="text-xs font-normal bg-white/10 text-slate-200 px-2.5 py-0.5 rounded-full">
                      {currentExercise.difficulty}
                    </span>
                  </h2>
                </div>

                {/* Switch between exercises in this lesson */}
                <div className="flex items-center gap-2">
                  {currentLesson.exercises.map((ex, idx) => (
                    <button
                      key={ex.id}
                      onClick={() => selectLessonAndExercise(currentLesson.id, idx)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        selectedExerciseIndex === idx
                          ? 'bg-indigo-500 text-white shadow'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {completedExercises[ex.id] && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      בעיה {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem Story Box */}
              <div className="p-6 bg-amber-50/50 border-b border-amber-200/60">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 text-amber-800 p-2 rounded-xl font-bold text-sm shrink-0">
                    📋 השאלה
                  </div>
                  <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                    {currentExercise.story}
                  </p>
                </div>
              </div>

              {/* 4-Stage Stepper Navigation */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { num: 1, title: "שלב 1: פירוק במילים", desc: "בלי קוד בכלל!" },
                    { num: 2, title: "שלב 2: בניית השלד", desc: "המבנה הטכני הקבוע" },
                    { num: 3, title: "שלב 3: תרגום שורה-שורה", desc: "השלמת הקוד יחד" },
                    { num: 4, title: "שלב 4: טבלת מעקב חיה", desc: "סימולטור F9 ומקרי קצה" }
                  ].map((st) => {
                    const active = currentStage === st.num;
                    return (
                      <button
                        key={st.num}
                        onClick={() => setCurrentStage(st.num)}
                        className={`p-3 rounded-xl border text-right transition-all ${
                          active
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="font-bold text-xs sm:text-sm">{st.title}</div>
                        <div className={`text-xs mt-0.5 ${active ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {st.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STAGE CONTENT AREA */}
              <div className="p-6">
                
                {/* --- STAGE 1: VERBAL DECONSTRUCTION --- */}
                {currentStage === 1 && (
                  <div className="space-y-6">
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 text-sm text-slate-700">
                      <span className="font-bold text-indigo-900">💡 כלל מס' 1 מול דף ריק: </span>
                      לעולם לא מתחילים להקליד קוד לפני שמסבירים לעצמנו במילים פשוטות מהם הנתונים שנכנסים ואיזו תבנית פותרת את הבעיה. בוא נענה יחד על 2 שאלות ההכוונה:
                    </div>

                    {/* Question 1 */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">א</span>
                        {currentExercise.stage1.questionInput}
                      </h3>
                      <div className="space-y-2 pr-8">
                        {currentExercise.stage1.optionsInput.map((opt) => {
                          const isSelected = stage1Ans1 === opt.id;
                          return (
                            <div key={opt.id}>
                              <button
                                onClick={() => setStage1Ans1(opt.id)}
                                className={`w-full text-right p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${
                                  isSelected
                                    ? opt.correct
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold'
                                      : 'bg-rose-50 border-rose-400 text-rose-950'
                                    : 'bg-white border-slate-200 hover:border-indigo-300'
                                }`}
                              >
                                <span>{opt.text}</span>
                                {isSelected && (
                                  opt.correct 
                                    ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                    : <X className="w-5 h-5 text-rose-600 shrink-0" />
                                )}
                              </button>
                              {isSelected && (
                                <div className={`mt-1.5 p-3 rounded-lg text-xs sm:text-sm ${
                                  opt.correct ? 'bg-emerald-100/70 text-emerald-900' : 'bg-rose-100/70 text-rose-900'
                                }`}>
                                  {opt.feedback}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Question 2 */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">ב</span>
                        {currentExercise.stage1.questionPattern}
                      </h3>
                      <div className="space-y-2 pr-8">
                        {currentExercise.stage1.optionsPattern.map((opt) => {
                          const isSelected = stage1Ans2 === opt.id;
                          return (
                            <div key={opt.id}>
                              <button
                                onClick={() => setStage1Ans2(opt.id)}
                                className={`w-full text-right p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${
                                  isSelected
                                    ? opt.correct
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold'
                                      : 'bg-rose-50 border-rose-400 text-rose-950'
                                    : 'bg-white border-slate-200 hover:border-indigo-300'
                                }`}
                              >
                                <span>{opt.text}</span>
                                {isSelected && (
                                  opt.correct 
                                    ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                    : <X className="w-5 h-5 text-rose-600 shrink-0" />
                                )}
                              </button>
                              {isSelected && (
                                <div className={`mt-1.5 p-3 rounded-lg text-xs sm:text-sm ${
                                  opt.correct ? 'bg-emerald-100/70 text-emerald-900' : 'bg-rose-100/70 text-rose-900'
                                }`}>
                                  {opt.feedback}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        onClick={() => setCurrentStage(2)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                          isStage1Complete()
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        הבנתי את ההיגיון! המשך לשלב 2: בניית השלד
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* --- STAGE 2: SKELETON BUILDER --- */}
                {currentStage === 2 && (
                  <div className="space-y-6">
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 text-sm text-slate-700">
                      <span className="font-bold text-indigo-900">🏗️ שלב הטכניקה (השלד): </span>
                      כמו שעופר אומר בשיעור — עוד לפני שחושבים על הפרטים הקטנים של השאלה, אנחנו מניחים על הדף את השלד הקבוע של המבנה שלנו. חשוף את שלבי השלד אחד אחרי השני:
                    </div>

                    <div className="space-y-4">
                      {currentExercise.stage2.slice(0, revealedSkeletonSteps).map((item, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-start justify-between">
                          <div className="space-y-1 md:w-1/2">
                            <div className="flex items-center gap-2 font-bold text-indigo-900 text-sm">
                              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
                                {idx + 1}
                              </span>
                              {item.stepTitle}
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 pr-8 leading-relaxed">
                              {item.explanation}
                            </p>
                          </div>
                          <div dir="ltr" className="w-full md:w-1/2 bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm p-3.5 rounded-xl overflow-x-auto whitespace-pre">
                            {item.skeleton}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      {revealedSkeletonSteps < currentExercise.stage2.length ? (
                        <button
                          onClick={() => setRevealedSkeletonSteps(prev => prev + 1)}
                          className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-bold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          חשוף את החלק הבא בשלד ({revealedSkeletonSteps}/{currentExercise.stage2.length})
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-bold text-sm flex items-center gap-1.5">
                          <CheckCircle2 className="w-5 h-5" />
                          כל השלד מונח מולנו!
                        </span>
                      )}

                      <button
                        onClick={() => setCurrentStage(3)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 shadow-md"
                      >
                        המשך לשלב 3: כתיבת הקוד שורה-שורה
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* --- STAGE 3: LINE-BY-LINE CODE COMPLETION --- */}
                {currentStage === 3 && (
                  <div className="space-y-6">
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 text-sm text-slate-700 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-indigo-900">✍️ בונים את הקוד שורה-אחר-שורה: </span>
                        השלם את החלק החסר בכל שורה. שים לב להסבר ולרמז במידת הצורך.
                      </div>
                      <button
                        onClick={() => {
                          setStage3Selections({});
                          setStage3ActiveLine(0);
                        }}
                        className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        איפוס שורות
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Right Column: Interactive Prompts */}
                      <div className="lg:col-span-7 space-y-4">
                        {currentExercise.stage3.map((step, idx) => {
                          const sel = stage3Selections[idx];
                          const isUnlocked = idx <= stage3ActiveLine || sel?.isCorrect;
                          return (
                            <div
                              key={idx}
                              className={`p-4 rounded-xl border transition-all ${
                                sel?.isCorrect
                                  ? 'bg-emerald-50/40 border-emerald-300'
                                  : isUnlocked
                                  ? 'bg-white border-indigo-400 shadow-sm ring-2 ring-indigo-500/10'
                                  : 'bg-slate-100/70 border-slate-200 opacity-60 pointer-events-none'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                                  חלק {idx + 1} מתוך {currentExercise.stage3.length}
                                </span>
                                {sel?.isCorrect && (
                                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" /> הושלם!
                                  </span>
                                )}
                              </div>

                              <p className="text-sm font-bold text-slate-800 mb-3">{step.prompt}</p>

                              {/* Code preview with blank */}
                              <div dir="ltr" className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs sm:text-sm mb-3 overflow-x-auto whitespace-pre">
                                <span>{step.codePrefix}</span>
                                <span className={`px-2 py-0.5 rounded font-bold mx-0.5 ${
                                  sel?.isCorrect
                                    ? 'bg-emerald-500 text-slate-950'
                                    : sel && !sel.isCorrect
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-amber-400 text-slate-950 animate-pulse'
                                }`}>
                                  {sel ? sel.selected : " ??? "}
                                </span>
                                <span>{step.codeSuffix}</span>
                              </div>

                              {/* Options buttons */}
                              <div dir="ltr" className="flex flex-wrap gap-2">
                                {step.options.map((opt, oIdx) => {
                                  const isThisSelected = sel?.selected === opt;
                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => handleStage3OptionSelect(idx, opt, step.correct)}
                                      className={`font-mono text-xs sm:text-sm px-3.5 py-2 rounded-lg border transition-all ${
                                        isThisSelected
                                          ? sel.isCorrect
                                            ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                                            : 'bg-rose-600 text-white border-rose-600'
                                          : 'bg-slate-50 hover:bg-indigo-50 text-slate-800 border-slate-300'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Hint or Error feedback */}
                              {sel && !sel.isCorrect && (
                                <div className="mt-2.5 text-xs text-rose-800 bg-rose-100/80 p-2.5 rounded-lg flex items-center gap-2">
                                  <Lightbulb className="w-4 h-4 shrink-0 text-rose-600" />
                                  <span><strong>רמז מנטור:</strong> {step.hint}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Left Column: Live Assembled Script */}
                      <div className="lg:col-span-5">
                        <div className="sticky top-6 bg-slate-900 rounded-2xl p-5 text-white shadow-xl border border-slate-800">
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
                              <Terminal className="w-4 h-4 text-emerald-400" />
                              חלונית ה-Script המתגבשת שלך (Spyder)
                            </span>
                            <span className="text-xs text-indigo-400 font-mono">solution.py</span>
                          </div>

                          <div dir="ltr" className="font-mono text-xs sm:text-sm space-y-1.5 text-slate-200 overflow-x-auto whitespace-pre leading-relaxed">
                            {currentExercise.stage3.map((step, idx) => {
                              const sel = stage3Selections[idx];
                              return (
                                <div key={idx} className={sel?.isCorrect ? "text-emerald-300" : "text-slate-500"}>
                                  {step.codePrefix}
                                  {sel?.isCorrect ? sel.selected : "___"}
                                  {step.codeSuffix}
                                </div>
                              );
                            })}
                          </div>

                          {isStage3Complete() && (
                            <div className="mt-6 pt-4 border-t border-slate-800">
                              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-3 text-emerald-200 text-xs mb-3">
                                🎉 מדהים! הרכבת את כל התוכנית שורה-אחר-שורה! עכשיו בוא נריץ אותה בטבלת המעקב החיה.
                              </div>
                              <button
                                onClick={() => {
                                  markCurrentExerciseDone();
                                  setCurrentStage(4);
                                }}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                              >
                                <Play className="w-4 h-4 fill-current" />
                                הרץ בסימולטור טבלת מעקב (שלב 4)
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- STAGE 4: INTERACTIVE TRACE TABLE & STEP-BY-STEP F9 VISUALIZER --- */}
                {currentStage === 4 && (
                  <div className="space-y-6">
                    {/* Scenario Selector & Controls */}
                    <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-600 ml-2">בחר תרחיש הרצה (כולל מקרי קצה!):</span>
                        {currentExercise.stage4.scenarios.map((scen, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => {
                              setSelectedScenarioIdx(sIdx);
                              setTraceStepIdx(0);
                            }}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              selectedScenarioIdx === sIdx
                                ? 'bg-indigo-600 text-white shadow'
                                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {scen.name}
                          </button>
                        ))}
                      </div>

                      {/* Step Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTraceStepIdx(0)}
                          disabled={traceStepIdx === 0}
                          className="p-2 rounded-lg bg-white border border-slate-300 text-slate-700 disabled:opacity-40 hover:bg-slate-50"
                          title="התחל מההתחלה"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setTraceStepIdx(prev => Math.max(0, prev - 1))}
                          disabled={traceStepIdx === 0}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50"
                        >
                          צעד קודם
                        </button>
                        <button
                          onClick={() => {
                            if (traceStepIdx < currentScenario.steps.length - 1) {
                              setTraceStepIdx(prev => prev + 1);
                            } else {
                              markCurrentExerciseDone();
                            }
                          }}
                          disabled={traceStepIdx === currentScenario.steps.length - 1}
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow disabled:opacity-40"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          הצעד הבא (F9) ({traceStepIdx + 1}/{currentScenario.steps.length})
                        </button>
                      </div>
                    </div>

                    {/* Code + Live Variables + Trace Table History */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Code with Highlighted Active Line */}
                      <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-5 text-white border border-slate-800 shadow-lg">
                        <div className="text-xs font-bold text-slate-400 mb-3 flex items-center justify-between">
                          <span>קוד התוכנית (השורה המתבצעת כעת מסומנת בצהוב)</span>
                          <span className="font-mono text-amber-400">שורה {currentTraceStep.line + 1}</span>
                        </div>
                        <div dir="ltr" className="font-mono text-xs sm:text-sm space-y-1 overflow-x-auto">
                          {currentExercise.stage4.codeLines.map((lineText, idx) => {
                            const isCurrentLine = currentTraceStep.line === idx;
                            return (
                              <div
                                key={idx}
                                className={`px-3 py-1.5 rounded flex items-center gap-3 transition-all ${
                                  isCurrentLine
                                    ? 'bg-amber-400/20 text-amber-300 border-l-4 border-amber-400 font-bold'
                                    : 'text-slate-300'
                                }`}
                              >
                                <span className="text-slate-600 select-none w-4 text-right text-xs">{idx + 1}</span>
                                <span className="whitespace-pre">{lineText}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation Note for Current Step */}
                        <div className="mt-4 bg-indigo-950/90 border border-indigo-500/40 rounded-xl p-3.5 text-xs sm:text-sm text-indigo-100 leading-relaxed">
                          <span className="font-bold text-amber-300 block mb-1">🔍 מה קורה בצעד הזה מאחורי הקלעים?</span>
                          {currentTraceStep.note}
                        </div>
                      </div>

                      {/* Variables Memory Box & Console Output + Full Trace Table */}
                      <div className="lg:col-span-6 space-y-4">
                        {/* Current Memory State */}
                        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                            <Cpu className="w-4 h-4 text-indigo-600" />
                            מצב המשתנים בזיכרון כרגע (Variables Explorer)
                          </h4>
                          {Object.keys(currentTraceStep.vars).length === 0 ? (
                            <p className="text-xs text-slate-400 italic">טרם הוגדרו משתנים בזיכרון...</p>
                          ) : (
                            <div dir="ltr" className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                              {Object.entries(currentTraceStep.vars).map(([vName, vVal]) => (
                                <div key={vName} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-col">
                                  <span className="text-xs text-slate-500 font-mono">{vName}</span>
                                  <span className="text-sm font-bold font-mono text-indigo-700 mt-0.5">{vVal}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Console Output */}
                        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-white">
                          <h4 className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                            <Terminal className="w-4 h-4 text-emerald-400" />
                            חלונית ה-Console (קלט / פלט בצעד הנוכחי)
                          </h4>
                          <div dir="ltr" className="font-mono text-xs sm:text-sm text-emerald-400 min-h-[2.2rem] flex items-center">
                            {currentTraceStep.output || <span className="text-slate-600 italic"># אין פלט או קלט בשורה זו</span>}
                          </div>
                        </div>

                        {/* Cumulative Trace Table (טבלת מעקב מצטברת) */}
                        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm overflow-x-auto">
                          <h4 className="text-xs font-bold text-slate-700 mb-2.5">
                            📊 טבלת מעקב מצטברת (Trace Table) עד לצעד הנוכחי:
                          </h4>
                          <table dir="ltr" className="w-full text-left border-collapse font-mono text-xs">
                            <thead>
                              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                                <th className="p-2">Step</th>
                                <th className="p-2">Line</th>
                                {Object.keys(currentScenario.steps[currentScenario.steps.length - 1].vars).map(k => (
                                  <th key={k} className="p-2 text-indigo-700">{k}</th>
                                ))}
                                <th className="p-2 text-emerald-700">Console / Print</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentScenario.steps.slice(0, traceStepIdx + 1).map((st, idx) => (
                                <tr
                                  key={idx}
                                  className={`border-b border-slate-100 ${
                                    idx === traceStepIdx ? 'bg-amber-50 font-bold' : ''
                                  }`}
                                >
                                  <td className="p-2 text-slate-400">{idx + 1}</td>
                                  <td className="p-2">{st.line + 1}</td>
                                  {Object.keys(currentScenario.steps[currentScenario.steps.length - 1].vars).map(k => (
                                    <td key={k} className="p-2 text-slate-800">{st.vars[k] ?? "-"}</td>
                                  ))}
                                  <td className="p-2 text-emerald-700">{st.output}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 2: EXAM PATTERN FINDER (מפענח שאלות מבחן)
        ==================================================== */}
        {activeTab === 'patterns' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Compass className="w-6 h-6 text-indigo-600" />
                מפענח שאלות מבחן — איזו שאלה עומדת מולך?
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                במבחן, הקושי העיקרי הוא לזהות מתוך הסיפור המילולי באיזו תבנית אלגוריתמית להשתמש. לחץ על הניסוח שהכי דומה לשאלה שלפניך וראה מיד את האנלוגיה, שלד הקוד המדויק, ואזהרת מקרה הקצה של עופר:
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Right list: Question triggers */}
                <div className="lg:col-span-5 space-y-2.5">
                  {PATTERN_FINDER_DATA.map((item) => {
                    const isSelected = item.id === activePatternId;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActivePatternId(item.id)}
                        className={`w-full text-right p-4 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                            : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200'
                        }`}
                      >
                        <div className="text-xs font-bold opacity-80 mb-1">{item.patternName}</div>
                        <div className="text-sm font-bold leading-snug">{item.questionPrompt}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Left panel: Pattern Solution Details */}
                <div className="lg:col-span-7">
                  {(() => {
                    const pat = PATTERN_FINDER_DATA.find(p => p.id === activePatternId) || PATTERN_FINDER_DATA[0];
                    return (
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-5">
                        <div>
                          <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">
                            התבנית המתאימה
                          </span>
                          <h3 className="text-xl font-bold text-slate-900 mt-2">{pat.patternName}</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed">
                          <strong className="text-indigo-900 block mb-1">💡 איך לדמיין את זה?</strong>
                          {pat.analogy}
                        </div>

                        <div>
                          <div className="text-xs font-bold text-slate-500 mb-2">שלד הקוד המוכן להעתקה לראש שלך במבחן:</div>
                          <pre dir="ltr" className="bg-slate-900 text-emerald-300 p-4 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
                            {pat.codeTemplate}
                          </pre>
                        </div>

                        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                            <strong className="block mb-0.5 text-amber-900">⚠️ מלכודת מבחן / מקרה קצה שחייבים לזכור:</strong>
                            {pat.edgeCaseWarning}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 3: BLANK PAGE SIMULATOR (סימולטור דף חלק)
        ==================================================== */}
        {activeTab === 'blankpage' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Code className="w-6 h-6 text-indigo-600" />
                    סימולטור כתיבה מול דף חלק (ללא פחד!)
                  </h2>
                  <p className="text-sm text-slate-600 mt-0.5">
                    כאן מתאמנים על כתיבה עצמאית מול שורה ריקה, אבל אני יושב לידך ונותן לך הנחיה מדויקת לכל שורה בנפרד.
                  </p>
                </div>

                <div className="flex gap-2">
                  {GUIDED_WRITING_CHALLENGES.map((ch, idx) => (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setSelectedChallengeIdx(idx);
                        setCurrentChallengeStep(0);
                        setBuiltLines([]);
                        setUserCodeInput("");
                        setStepFeedback(null);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedChallengeIdx === idx
                          ? 'bg-indigo-600 text-white shadow'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      אתגר {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Right Column: Mentor Step Instruction & Input */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="text-xs font-bold text-amber-800 mb-1">{currentChallenge.title}</div>
                    <p className="text-sm text-slate-800 font-medium">{currentChallenge.description}</p>
                  </div>

                  <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold bg-indigo-600 text-white px-2.5 py-1 rounded-full">
                        צעד {currentChallengeStep + 1} מתוך {currentChallenge.steps.length}
                      </span>
                      <button
                        onClick={() => {
                          setCurrentChallengeStep(0);
                          setBuiltLines([]);
                          setUserCodeInput("");
                          setStepFeedback(null);
                        }}
                        className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        התחל מחדש
                      </button>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-indigo-950">
                      {currentChallenge.steps[currentChallengeStep].instruction}
                    </p>

                    <div dir="ltr">
                      <input
                        type="text"
                        value={userCodeInput}
                        onChange={(e) => setUserCodeInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCheckGuidedLine()}
                        placeholder="Type your Python line here..."
                        className="w-full bg-slate-900 text-emerald-300 font-mono text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    {stepFeedback && (
                      <div className={`p-3 rounded-xl text-xs sm:text-sm font-medium ${
                        stepFeedback.type === 'success'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {stepFeedback.text}
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        onClick={handleCheckGuidedLine}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
                      >
                        בדוק והוסף שורה לקוד
                      </button>
                      <button
                        onClick={handleRevealGuidedLine}
                        className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
                      >
                        נתקעתי — הצג והוסף עבורי את השורה
                      </button>
                    </div>
                  </div>
                </div>

                {/* Left Column: The Blank Page filling up */}
                <div className="lg:col-span-6">
                  <div className="bg-slate-900 rounded-2xl p-5 text-white min-h-[260px] flex flex-col justify-between border border-slate-800 shadow-lg">
                    <div>
                      <div className="text-xs font-bold text-slate-400 pb-3 mb-3 border-b border-slate-800 flex justify-between">
                        <span>הדף שלך (שכבר ממש לא ריק!)</span>
                        <span className="font-mono text-emerald-400">my_script.py</span>
                      </div>
                      {builtLines.length === 0 ? (
                        <p className="text-xs text-slate-500 italic font-mono" dir="ltr">
                          # Your code will appear here line by line...
                        </p>
                      ) : (
                        <pre dir="ltr" className="font-mono text-xs sm:text-sm text-emerald-300 whitespace-pre-wrap leading-relaxed">
                          {builtLines.join("\n")}
                        </pre>
                      )}
                    </div>

                    {builtLines.length >= currentChallenge.steps.length && (
                      <div className="mt-4 bg-emerald-500/20 border border-emerald-400/40 rounded-xl p-3 text-emerald-200 text-xs sm:text-sm">
                        🏆 אלוף! סיימת לבנות את התוכנית השלמה צעד-אחר-צעד!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}