--sql method
-- orders
[
{ _id: 0, productName: "Steel beam", status: "new", quantity: 10 },
{ _id: 1, productName: "Steel beam", status: "urgent", quantity: 20 },
{ _id: 2, productName: "Steel beam", status: "urgent", quantity: 30 },
{ _id: 3, productName: "Iron rod", status: "new", quantity: 15 },
{ _id: 4, productName: "Iron rod", status: "urgent", quantity: 50 },
{ _id: 5, productName: "Iron rod", status: "urgent", quantity: 10 }
]


-- stage 1 - Filter
select * from Oders where Status = "urgent";
[
{ _id: 1, productName: "Steel beam", status: "urgent", quantity: 20 },
{ _id: 2, productName: "Steel beam", status: "urgent", quantity: 30 },
{ _id: 4, productName: "Iron rod", status: "urgent", quantity: 50 },
{ _id: 5, productName: "Iron rod", status: "urgent", quantity: 10 }
]

-- stage 2 - aggregate

select productName as _id, quantity as totalUrgentQuantity sum(quantity) from Oders 
where status = "urgent"
group by quantity;




-- Output
[
    {_id: "Steel beam", totalUrgentQuantity: 50},
    {_id: "Iron rod", totalUrgentQuantity: 60}
]