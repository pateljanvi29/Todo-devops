(async ()=>{
  try {
    const res = await fetch('http://localhost:5000/api/tasks');
    const text = await res.text();
    console.log('Smoke test status:', res.status);
    console.log('Response body:', text);
    process.exit(0);
  } catch (err) {
    console.error('Smoke test failed:', err);
    process.exit(2);
  }
})()
