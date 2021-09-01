trust-me Smart Contract
==================

## Manejo de reputación de pares en aplicaciones de negocios p2p desentralizados.  ##
Descripción: En toda operación entre pares en redes decentralizadas y anónimas, ya sea para una operación de transferencia de tokens, o bien en donde un recurso (tangible o no tamgible) es utilizado como parte de una transacción, es necesario establecer una relación de confianza entre las partes (aka pares o peers).
Con TrustMe, intentamos quebrar esa barrera brindando un servicio de registro de reputación de miembros de una comunidad (community-based), o bien una red (blockchain-based).

Operaciones: 
   * Permitir _consultar la confianza_ (ranking) de la contraparte en la comunidad antes de realizar una transacción.
   * Permitir _registrar la confianza_ de la contraparte luego de realizar una transacción.
   * Permitir _registrar la desconfianza_ de la contraparte luego de realizar una transacción. 
   * Permitir consultar los confiantes de un miembro de la comunidad. 
   * Permitir consultar los confidentes de un miembro en la comunidad.


Quick Start
===========

Before you compile this code, you will need to install [Node.js] ≥ 12


Exploring The Code
==================

1. The main smart contract code lives in `assembly/index.ts`. You can compile
   it with the `./compile` script.
2. Tests: You can run smart contract tests with the `./test` script. This runs
   standard AssemblyScript tests using [as-pect].


  [smart contract]: https://docs.near.org/docs/develop/contracts/overview
  [AssemblyScript]: https://www.assemblyscript.org/
  [create-near-app]: https://github.com/near/create-near-app
  [Node.js]: https://nodejs.org/en/download/package-manager/
  [as-pect]: https://www.npmjs.com/package/@as-pect/cli
