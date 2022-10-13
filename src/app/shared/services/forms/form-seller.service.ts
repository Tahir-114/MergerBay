import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessOrGreaterThan, NumbersOnly } from '../common/Validations';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(
    private builder: FormBuilder
  ) { }
 
  initLoginForm = (): FormGroup => {
    return this.builder.group({
      emaillogin: ['',
        Validators.compose([
          Validators.email,
          Validators.required // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ])
      ],
      passwordlogin: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ])
      ]
    })
  }

  iniProfileForm = (): FormGroup => {
    return this.builder.group({
      firstName: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.required // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ])
      ],
      lastName: ['',
      Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
      ])
    ],
    email: ['',
    Validators.compose([
      Validators.minLength(3),
      Validators.email,
      Validators.maxLength(100),
      Validators.required // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
    ])
  ],
  country: ['',
  Validators.compose([
    Validators.required // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
  ])
],
location: ['',
Validators.compose([
  Validators.minLength(3),
  Validators.maxLength(100),
  Validators.required // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
])
],
phone: ['',
Validators.compose([
  Validators.minLength(3),
  Validators.pattern('[- +()0-9]+'),
  Validators.maxLength(100),
  Validators.required // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
])
],


    })
  }

  iniCompanyInformationForm = (): FormGroup => {
    return this.builder.group({
company: ['',
Validators.compose([
  Validators.minLength(3),
  Validators.maxLength(100),
  Validators.required // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
])
],
website: ['',
Validators.compose([
  Validators.minLength(3),
  Validators.maxLength(100),
  Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
])
],
designation: ['',
Validators.compose([
  Validators.minLength(3),
  Validators.maxLength(100),
  Validators.required // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
])
],
category: ['',
Validators.compose([
  Validators.required // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
])
],
    })
  }

  initForgotPasswordForm = (): FormGroup => {
    return this.builder.group({
      email: ['',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ]
    })
  }

  initNewPasswordForm = (): FormGroup => {
    return this.builder.group({
      email: [''],
      code: [''],
      password: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      confirmPassword: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ]
    })
  }

  initSignupForm = (): FormGroup => {
    return this.builder.group({
      firstname: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ])
      ],
      lastname: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ])
      ],
      email: ['',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      password: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ]),
      ],
      confirmPassword: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      country: ['',
      Validators.compose([
        Validators.required,// https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
      ])
    ],
    phone: ['',
    Validators.compose([
      Validators.required,
      Validators.minLength(3)
    ])
  ],
  accepted: [false,
  Validators.compose([
    Validators.requiredTrue
  ])
],
    },
    {
      validator: this.MustMatch("password", "confirmPassword"),
    }
    )
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

initCommercialProperty = (): FormGroup => {
    return this.builder.group({
      projectName: ['',[Validators.required,Validators.minLength(5)]],
      businessLocation_Id: ['',Validators.compose([Validators.required])],
      property_Id: ['', Validators.compose([Validators.required])],
      year_Id: ['', Validators.compose([Validators.required])],
      duration_Id: ['', Validators.compose([Validators.required])],
      propertyValue: [25, Validators.compose([Validators.required])],
      landArea: ['', Validators.compose([Validators.required,NumbersOnly()])],
      builtUpArea: ['', Validators.compose([Validators.required,NumbersOnly()])],
      hasContract: [true, Validators.compose([Validators.required])],
      annualGrossIncome: ['', Validators.compose([Validators.required,NumbersOnly()])],
      isValuationReport: [true, Validators.compose([Validators.required])],
      transactionRole_Id: ['', Validators.compose([Validators.required])],
      isMendate: [true],
      description: ['',Validators.compose([Validators.required, Validators.minLength(10)])],
      termsAndConditions: [false, Validators.required],
    });
  }


initSelOutForm = (): FormGroup => {
    return this.builder.group({
      projectName: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ])
      ],
      businessLocation_Id: ['',
        Validators.compose([
          Validators.required,
        ])
      ],
      subsidiary_Ids: [[],
      Validators.compose([
        Validators.required,
      ])
    ],
    sector_Ids: [[],
    Validators.compose([
      Validators.required,
    ])
  ],
  subSector_Ids: [[],
  Validators.compose([
    // Validators.required,
  ])
],
year_Id: ['',
Validators.compose([
  Validators.required,
])
],
revenue: this.builder.array([]),
ebitay: this.builder.array([]),
netProfit: this.builder.array([]),
sellingValue: [7,
Validators.compose([
  Validators.required,
])
],
fixedAssets: [7,
Validators.compose([
  Validators.required,
])
],
inventoryValue: [7,
Validators.compose([
  Validators.required,
])
],
isBankDebit: ['',
Validators.compose([
  Validators.required,
])
],
isAuditFinancialStatement: ['',
Validators.compose([
  Validators.required,
])
],
isValuationReport: ['',
Validators.compose([
  Validators.required,
])
],
transactionRole_Id: ['',
Validators.compose([
  Validators.required,
])
],
isMendate:[true],
description: ['',
Validators.compose([
  Validators.required,
  Validators.minLength(10),
])
],
termsAndConditions:[false,Validators.required],
    })
  }

initBuyerCommercialProperty = (): FormGroup => {
    return this.builder.group(
      {
      businessLocation_Id: ['',[Validators.required,]],
      property_Id: ['',[Validators.required]],
      country_Ids: ['',[Validators.required]],
      city_Id: ['',[Validators.required]],
      propertyValueFrom: ['',
      {
        validators: [Validators.required,NumbersOnly()],
        updateOn: 'blur',
      }
    ],
    propertyValueTo: ['',
      {
        validators: [Validators.required,NumbersOnly()],
        updateOn: 'blur',
      }],
      isFinancingRequired: [true,[Validators.required]],
      transactionRole_Id: ['',[Validators.required]],
      isMendate:[true],
      description: ['',[Validators.required,Validators.minLength(10)]],
      termsAndConditions:[false,Validators.required],
    },
    {
      validator : LessOrGreaterThan('propertyValueFrom','propertyValueTo'),
    }
    );
  }
initBuyOutForm = (): FormGroup => {
    return this.builder.group({
      businessLocation_Id: ['',[Validators.required,]],
      sector_Ids: [[],Validators.compose([Validators.required])],
      country_Ids: [[],[Validators.required]],
      city_Id: ['',[Validators.required]],
      pref_Id: [null,[Validators.required]],
      transactionType_Id: [null,[Validators.required]],
      valuationPreferenceFrom: ['',
      {
        validators: [Validators.required,NumbersOnly()],
        updateOn: 'blur',
      }],
     valuationPreferenceTo: ['',
      {
        validators: [Validators.required,NumbersOnly()],
        updateOn: 'blur',
      }],
      investmentValueFrom: ['',{
        validators: [Validators.required,NumbersOnly()],
        updateOn: 'blur',
      }],
      investmentValueTo: ['',
      {
        validators: [Validators.required,NumbersOnly()],
        updateOn: 'blur',
      }],
      revenue_Id: ['',[Validators.required]],
      eBITDA: ['',[Validators.required,NumbersOnly()]],
      netProfit: ['',[Validators.required,NumbersOnly()]],
      isFinancingRequired: [true,[Validators.required]],
      transactionRole_Id: ['',[Validators.required]],
      isMendate:[true],
      description: ['',[Validators.required,Validators.minLength(10)]],
      termsAndConditions:[false,Validators.required],
    },
    {
      validator : [LessOrGreaterThan('valuationPreferenceFrom','valuationPreferenceTo'),LessOrGreaterThan('investmentValueFrom','investmentValueTo')],
    })      
  }
}