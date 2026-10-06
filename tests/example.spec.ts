import { test, expect } from '@playwright/test';
import { config } from '../fixtures/config/config';
import { conectar } from '../fixtures/plugins';



test.describe('Example Test Suite', () => {

  test('Database Connection Test', async () => {
    const query = 'SELECT * FROM cliente';
    const result = await conectar(query);
    console.log(result[1].CIDADE);

  })

  // test('API Test', async ({ request }) => {
  //   const response = await request.get('https://gorest.co.in/public/v2/users', {
  //     headers: {
  //       Authorization: `Bearer ${config.auth.token}`
  //     }
  //   }
  //   );
  //   expect(response.status()).toBe(200);
  //   const data = await response.json();
  //   const users = await response.json();
  //   console.log(users[4].name);
  //   console.log(data[0].name);
  // })


})
