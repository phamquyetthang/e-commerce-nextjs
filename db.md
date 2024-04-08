### Admins ( Managers )
```
- email: string
- password: string
- isActive: boolean
- deleted_at: string
- created_at: string
- updated_at: string
```

### Categories
```
- id: string
- name: string
- description: string
- slug: string
```

### Products
```
- id: string
- name: string
- images: string[]
- description: string
- stripe_product_id: string
- price: string;
- created_by: AdminRef
- categories: categoryRef
  |- ##### Categories
    |- id: string
    |- name: string
    |- description: string
    |- slug: string
```

### Coupons
```
- id: string
- name: string
- expired_at: string
- percent: number  (%)
- stripe_id: string
```

### Users
```
- id: string
- email: string
- password: string
- firstName: string
- lastName: string
- avt: string
```


### Orders
```
- id: string
- user: UserRef
- products: ProductRef
- coupon: CouponRef
- total: number
- stripe_invoice_id: string
- status: string
```