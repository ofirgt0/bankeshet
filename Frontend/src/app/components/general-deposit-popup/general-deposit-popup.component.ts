import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancialSchoolBackendAccessService } from 'src/app/services/financial-school-backend-access.service';

@Component({
  selector: 'app-general-deposit-popup',
  templateUrl: './general-deposit-popup.component.html',
  styleUrls: ['./general-deposit-popup.component.css', '../generalStyling.css']
})
export class GeneralDepositPopupComponent implements OnInit {

  isOpen: boolean = false;
  selectedOption: string = 'Select an option';
  options: { shortcut: string, description: string }[] = [
    {
      "shortcut": "חבר לכל ילד",
      "description": "לכל ילדי הכיתה היה עם מי לשחק היום אם רצו בכך."
    },
    {
      "shortcut": "יעד כיתתי",
      "description": "ילדי הכיתה עמדו ביעד הכיתתי שנקבע."
    },
    {
      "shortcut": "מטבע הנקיון",
      "description": "הכיתה נקייה ומסודרת בסוף היום."
    },
    {
      "shortcut": "ניקיון השירותים",
      "description": "תאי שירותים במצב סביר בסוף היום."
    },
    {
      "shortcut": "דרך ארץ",
      "description": "ילדי הכיתה משתמשים בשפה מכבדת אחד כלפי השני וכלפי הצוות החינוכי."
    },
    {
      "shortcut": "ביקור חולים",
      "description": 'ילדי הכיתה דרשו בשלומו של חבר חולה ע"פ ההחלטה הכיתתית.'
    },
    {
      "shortcut": "יוזמות למפגשים",
      "description": "ילדים יזמו מפגש אחה״צ ורוב ילדי הכיתה התייחסו ליזמה - אישרו הגעה או הסבירו שלא יוכלו להגיע."
    },
    {
      "shortcut": "שבוע ללא אירועי אלימות",
      "description": "לא היו אירועי אלימות בכיתה."
    },
    {
      "shortcut": "תקשורת מקרבת",
      "description": "ילדי הכיתה עשו מעשים טובים, פרגנו זה לזה ואמרו מילים טובות."
    },
    {
      "shortcut": "רשתות חברתיות",
      "description": "השיח בקבוצת הוואטסאפ הכיתתית היה מכבד."
    },
    {
      "shortcut": "יעדים אישיים",
      "description": "הילדים התקדמו במטרות האישיות שנקבעו בימי ההורים."
    },
    {
      "shortcut": "ביצוע היזמה הכיתתית",
      "description": "היזמה הכיתתית בוצעה."
    },
    {
      "shortcut": "מעגלי הקשבה",
      "description": "כל קבוצות העוגן ביצעו את המשימה במעגלי ההקשבה."
    },
    {
      "shortcut": "ייצוג בכבוד",
      "description": "טקס הועבר באופן מכובד."
    },
    {
      "shortcut": 'פעילויות אחה"צ',
      "description": 'כל ילדי הכיתה השתתפו, או הסבירו שלא יכולים להשתתף'
    }
  ];

  update: CurrencyUpdate = {
    amount: 0, reason: "", type: Type.Deposit
  };
  popupTitle!: string;
  popupIconPath!: string;

  constructor(
    public dialogRef: MatDialogRef<GeneralDepositPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { popupType: Type, currency: number },
  ) { }

  ngOnInit(): void {
    this.update.type = this.data.popupType;
    switch (this.data.popupType) {
      case Type.Deposit: {
        this.popupTitle = "הפקדת קשף";
        this.popupIconPath = "../../assets/frontSections/Icons/Icon_Expenditure.svg";
        break;
      }
      case Type.Tax: {
        this.popupTitle = "תשלום מס";
        this.popupIconPath = "../../assets/frontSections/Icons/Icon_PayTax.svg";
        this.update.reason = "תשלום למחלקת הביטוח הלאומי של קשת"
        break;
      }
      case Type.Penalty: {
        this.popupTitle = "תשלום קנס";
        this.popupIconPath = "../../assets/frontSections/Icons/Icon_PayFine.svg";
        break;
      }
      default:
    }
  }

  onSaveClick(): void {
    this.dialogRef.close({ update: this.update });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.isOpen = false;
  }

}

export enum Type {
  Deposit = 0,
  Tax = 1,
  Penalty = 2,
}

export interface CurrencyUpdate {
  amount: number;
  reason: string;
  type: Type;
}
