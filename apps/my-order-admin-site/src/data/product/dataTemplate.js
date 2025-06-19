Products ={
    id: 2,
    name: 'product name',
    category: 'product category',
    subCategory: 'product sub-category', // if have, if not: no sub-cat
    tag: 'product tag', // small words on card
    detail: 'product detail', // in see more detail
    image: '/images/pendulum.jpg', // if no image don't show the element
    hasOptions: true,
    basePrice: 600,
    soldOut: false,
    options: [//if hasOptions=false, don't show this element
        {
            optionNo: 1,
            optionType: 'dropdown', // [dropdown, multiple selection (to-do), detail card]
            optionTitle: 'Material',            optionDetails: [
                {
                    name: 'Stainless Steel',
                    description: 'Durable and corrosion-resistant',
                    additionalPrice: 0,
                    tag: 'Popular'
                },
                {
                    name: 'Brass',
                    description: 'Warm golden tone with premium finish',
                    additionalPrice: 100,
                    tag: 'Premium'
                },
                {
                    name: 'Titanium',
                    description: 'Lightweight and ultra-durable',
                    additionalPrice: 200,
                    tag: 'Luxury'
                }
            ]
        },
        {
            optionNo: 2,
            optionType: 'detail card',
            optionTitle: 'Packaging',            optionDetails: [
                {
                    name: 'Standard Box',
                    description: 'Basic eco-friendly packaging',
                    additionalPrice: 0,
                    tag: 'Eco-Friendly'
                },
                {
                    name: 'Gift Box',
                    description: 'Includes ribbon and message card',
                    additionalPrice: 50,
                    tag: 'Gift'
                }
            ]
        }        // If you want to implement "multiple selection" type in future:
        // {
        //     optionNo: 3,
        //     optionType: 'multiple selection',
        //     optionTitle: 'Accessories',
        //     optionDetails: [
        //         {
        //             name: 'Extra Chain',
        //             description: 'Additional 20cm chain',
        //             additionalPrice: 30,
        //             tag: 'Add-on'
        //         },
        //         {
        //             name: 'Engraving',
        //             description: 'Custom name or message',
        //             additionalPrice: 80,
        //             tag: 'Personalized'
        //         }
        //     ]
        // }
    ]
}