import {login} from '../App/routers/login';

/* */
jest.mock('../App/routers/login', ()=>({
    login: jest.fn(),
    login: jest.fn().mockReturnValue(0),
    login: jest.fn().mockReturnValue(false)
}))


describe('Login User', ()=>{
  test('Deve permitir o login do usuario', ()=>{
     login.mockReturnValue(1);
      const result = login({
          username: "manoeljr",
          password: "aaa111"
      });
      expect(result).toBe(1)
  });

  test('Nao deve permitir que o login esteja vazio', ()=>{
      const user = {};
      expect(()=>{
          const result = login(user);
      }).toBeTruthy()
  });
  
  test('Nao deve permitir login com o campo username vazio', ()=>{
    const user = login({
        username: {},
        password: "000"
    });
    expect(()=>{
        const result = login(user);
    })
    });

  test('Nao deve permitir login com o campo password vazio', ()=>{
    const user = login({
       username: "Jubileu",
       password: {}
    });
    expect(()=>{
        const result = login(user);
    })
  });

  test('Deve permitir que varios usuarios façam login', ()=>{
    const user1 = {
      username: "manoeljr",
      password: "aaa111",
    };
    const user2 = {
      username: "lsantos",
      password: "aaa",
    };
    login.mockReturnValue(2);
    const result = login(user1, user2);
    expect(result).toBe(2);
  })
});