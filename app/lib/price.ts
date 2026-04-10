function formatPrice(amountInCents: number) {
    const amount = amountInCents / 100;
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}

export { formatPrice };