export function dtoViews(response) {
    const prod = response.payload.map(p => {
        return {
            id: p._id,
            title: p.title,
            description: p.description,
            price: p.price,
            stock: p.stock,
            category: p.category,
            thumbnail: p.thumbnail
        }
    })
    return prod
}