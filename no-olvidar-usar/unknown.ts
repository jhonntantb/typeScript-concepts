let userAny: any; //< ❌ El tipo any desactiva las comprobaciones de tipo en TypeScript
let userUnkown: unknown; ///< ✅ Desconoce el tipo de dato se le tiene que asignar

// userAny.myThing(); /// te deja acceder por que no verifica los datos
// userUnkown.myThing(); ///< Error: no puedes acceder por que no deniniste el tipo de userUnkown

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  age: number;
}

interface IAdminUser extends IUser {
  token: string;
  addNewUser: () => void;
}

function isAdminUser(object: unknown): object is IAdminUser {
  if (object !== null && typeof object === 'object') {
    return 'token' in object;
  }

  return false;
}

function isRegularUser(object: unknown): object is IUser {
  if (object !== null && typeof object === 'object') {
    return 'token'! in object;
  }

  return false;
}

async function fetchUser() {
  const response = await fetch('https://dummyjson.com/users/1');

  //mal uso ❌
  const badUser: IUser = await response.json();
  // badUser.

  //buen uso ✅
  const goodUser: unknown = await response.json();

  if (isAdminUser(goodUser)) {
    // tiene las propiedades de un administrador
    goodUser.addNewUser();
    goodUser.token;
  }

  if (isRegularUser(goodUser)) {
    // tiene las propiedades de un usuario normal
    goodUser.firstName;
  }
}
