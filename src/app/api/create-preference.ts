// async function handleCheckout() {
//   const response = await fetch("/api/create-preference", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       cart: cartItensArray,
//       userData,
//     }),
// });

//   const { init_point } = await response.json();
//   window.location.href = init_point; // redireciona para o pagamento
// }
