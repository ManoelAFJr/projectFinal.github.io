import {register} from '../App/routers/register';

/* dentro do repositori.fiilme tem uma routers inserir */
jest.mock('../App/routers/register', ()=>({
    register: jest.fn(),
    register: jest.fn().mockReturnValue(0),
    register: jest.fn().mockReturnValue(false)
}))


describe('Register User', ()=>{
  test('Deve permitir o cadastro de usuario', ()=>{
      register.mockReturnValue(1);
      const result = register({
          firstName: "Manoel",
          lastName: "Junior",
          username: "manoeljr",
          blood: "A+",
          age: 28,
          email: "mj@gmail.com",
          password: "aaa111",
          city: "Sousa",
          road: "rua Francisco Mendes",
          district: "As casinhas",
          zip: "58888000"
      });
      expect(result).toBe(1)
  });

  test('Nao deve permitir que crie um usuario vazio', ()=>{
      const user = {};
      expect(() => {
          const result = register(user);
      })
  });
  
  test('Deve permitir o cadastro de varios usuarios', ()=>{
    const user1 = {
      firstName: "Manoel",
      lastName: "Junior",
      username: "manoeljr",
      blood: "A+",
      age: 28,
      email: "mj@gmail.com",
      password: "aaa111",
      city: "Sousa",
      road: "rua Francisco Mendes",
      district: "As casinhas",
      zip: "58888000"
    };
    const user2 = {
      firstName: "Louro",
      lastName: "Santos",
      username: "lsantos",
      blood: "A+",
      age: 28,
      email: "ls@gmail.com",
      password: "aaa",
      city: "Sousa",
      road: "rua Francisco Mendes",
      district: "As casinhas",
      zip: "58888000"
    };
    register.mockReturnValue(2);
    const result = register(user1, user2);
    expect(result).toBe(2);
  })
  test('Não deve permitir usuarios com emails iguais', ()=>{
    register.mockReturnValue(true);
    expect(()=>{
      register({
        firstName: "Louro",
        lastName: "Santos",
        username: "lsantos",
        blood: "A+",
        age: 28,
        email: "ls@gmail.com",
        password: "aaa",
        city: "Sousa",
        road: "rua Francisco Mendes",
        district: "As casinhas",
        zip: "58888000"
      })
    }).toThrowError
  });
});