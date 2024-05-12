export type statuses =  "received" | "in progress" | "processed";

export interface IOrder {
    customer_id: number
    inventory_id: number
    store_id: number
    quantity: number
    status? : statuses // "received" | "in progress" | "processed"
}