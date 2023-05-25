const invoiceData = {
  currency: "INR",
  taxNotation: "GST",
  marginTop: 25,
  marginRight: 25,
  marginLeft: 25,
  marginBottom: 25,
  images: {
    logo: "https://picsum.photos/200",
  },
  sender: {
    company: resources.companyDetails.name,
    address: resources.companyDetails.address,
    zip: resources.companyDetails.zip,
    state: resources.companyDetails.state,
    country: resources.companyDetails.country,
    phone: resources.companyDetails.phone,
    email: resources.companyDetails.email,
  },
  client: {
    address: `${orderData.address.addressLine1}, ${orderData.address.addressLine2}`,
    zip: orderData.address.zipCode,
    state: orderData.address.state,
    country: orderData.address.country,
    phone: userData.phoneNumber,
    email: userData.email,
  },
  invoiceNumber: "INV-001",
  invoiceDate: currDate,
  products: [
    {
      quantity: orderData.quantity,
      size: orderData.size,
      color: orderData.color,
      price: orderData.price,
    },
  ],
  bottomNotice: "Thank you for your business!",
};
