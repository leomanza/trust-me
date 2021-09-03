# 🚧  trust-me
> Proyecto realizado para el NCD Bootcamp NEAR Hispano.
# trust-me es un servicio de manejo de confianza de pares en aplicaciones de negocios p2p desentralizados.

En toda operación entre pares en redes decentralizadas y anónimas, ya sea para una operación de transferencia de tokens, o bien en donde un recurso (tangible o no intangible) es utilizado como parte de una transacción, es necesario establecer una relación de confianza entre las partes (aka pares o peers).
Con TrustMe, intentamos quebrar esa barrera brindando un servicio de registro de reputación de miembros de una comunidad (community-based), o bien una red (blockchain-based).

# 🏭 trus-tme permitira realizar las siguientes operaciones
   * _consultar el nivel de confianza_ de un miembro en la comunidad antes de realizar una transacción.
   * _registrar la confianza_ de un miembro luego de realizar una transacción.
   * _registrar la desconfianza_ de un miembro luego de realizar una transacción. 
   * _consultar los confiantes_ de un miembro de la comunidad. 
   * _consultar los confidentes_ de un miembro en la comunidad.
   * _consultar mis confiantes_ dentro de la comunidad.
   * _consultar mis confidentes_ dentro de la comunidad.
   * consultar un ranking de miembros con mayor confianza.
   * consultar un ranking de miembros con menos confianza.

Cada miembro dentro de la comunidad se identifica con su _NEAR account ID_ 

# 🏁 Prerequisitos 
1. node.js >=12 instalado (https://nodejs.org)
2. yarn instalado
    ```bash
    npm install --global yarn
    ```
3. instalar dependencias
    ```bash
    yarn install --frozen-lockfile
    ```
4. crear una cuenta de NEAR en [testnet](https://docs.near.org/docs/develop/basics/create-account#creating-a-testnet-account)
5. instalar NEAR CLI
    ```bash
    yarn install --global near-cli
    ```
6. autorizar app para dar acceso a la cuenta de NEAR
    ```bash
    near login
     ```

🐑 Clonar el Repositorio
```bash
git clone https://github.com/leomanza/trust-me.git
```

🏗 instalar y compilar el contrato
```bash
    yarn install
    yarn build:contract:debug
```

🚀 Deployar el contrato
```bash
yarn dev:deploy:contract
```

🚂 Correr comandos
Una vez deployado el contrato, usaremos el Account Id devuelto por la operacion para ejecutar los comandos

Por ejemplo para registrar la confianza de un usuario ejecutaremos:
```bash
near call CONTRACT_ACCOUNT_ID trust '{"accountId": "juan.testnet", "comment":"todo perfecto", "relatedTx":"-"}' --account-id ACCOUNT_ID
```
Donde CONTRACT_ACCOUNT_ID es el account Id del contrato y ACCOUNT_ID es el account Id que utilizamos para autorizar la app

...TODO completar con el resto de los comandos











