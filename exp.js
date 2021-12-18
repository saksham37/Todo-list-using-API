function randomAsyncFunction() {
  // const time = Math.floor(Math.random * 100)
  const x = setTimeout(() => {
    console.log('finished!!')
  },1000)
}

async function asyncWithCallback(callback) {
  // Write logic here
  await randomAsyncFunction();
  callback();
}
 
asyncWithCallback(() => {
  console.log("fsdfsa")
})
