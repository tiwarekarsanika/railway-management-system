import axios from 'axios';

const BASE_URL = 'http://localhost:5432/api/bookings/createBooking'; 

const train_id = '2a9968f0-931a-4da8-bdd9-e00ec34894af';
const users = [
  {
    user_id: '086aec7c-322f-402f-84c1-702679b9d352',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTE4MzI1NTIsImV4cCI6MTc1MTgzNjE1Mn0.N-Eq5hrngD1mkaAbZ8zXSMhypzMgo9eMElCVX6ndq5g'
  },
  {
    user_id: 'bb63d09e-6e17-43be-8af5-ec6b4c51e2df',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImlhdCI6MTc1MTgzMjYxOSwiZXhwIjoxNzUxODM2MjE5fQ.Vzp_iqKlZAyzJMEhr6qZC_ZuKRLAJttbJ_vcoBylhjI'
  }
];

// Create 6 booking payloads
const payloads = Array.from({ length: 6 }).map((_, i) => {
  const user = users[i % 2];
  return {
    user_id: user.user_id,
    train_id,
    token: user.token,
    body: {
      boarding_station: 'Mumbai',
      destination_station: 'Delhi',
      number_of_seats: 1
    }
  };
});

const testConcurrentBookings = async () => {
  const results = await Promise.allSettled(
    payloads.map((p, i) =>
      axios
        .post(
          `${BASE_URL}?user_id=${p.user_id}&train_id=${p.train_id}`,
          p.body,
          {
            headers: {
              Authorization: `Bearer ${p.token}`
            }
          }
        )
        .then((res) => ({ success: true, data: res.data }))
    )
  );

  results.forEach((result, index) => {
    console.log(`Request ${index + 1}:`);
    if (result.status === 'fulfilled') {
      console.log('✅ Success:', result.value.data);
    } else {
      const errorData = result.reason?.response?.data || result.reason.message;
      console.log('❌ Failed:', errorData);
    }
    console.log('-------------------------');
  });
};

testConcurrentBookings();
