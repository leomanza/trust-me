# 🚧  trust-me
> Proyecto realizado para el NCD Bootcamp NEAR Hispano.
# trust-me es un servicio de manejo de confianza de pares en aplicaciones de negocios p2p desentralizados.

En toda operación entre pares en redes decentralizadas y anónimas, ya sea para una operación de transferencia de tokens, o bien en donde un recurso (tangible o no intangible) es utilizado como parte de una transacción, es necesario establecer una relación de confianza entre las partes (aka pares o peers).
Con TrustMe, intentamos quebrar esa barrera brindando un servicio de registro de reputación de miembros de una comunidad (community-based), o bien una red (blockchain-based).

# 🏭 trust-me permitirá realizar las siguientes operaciones
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
cd trust-me
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
Una vez deployado el contrato, usaremos el Account Id devuelto por la operacion para ejecutar los comandos, que será el account Id del contrato [será utilizado como CONTRACT_ACCOUNT_ID en los ejemplos de comandos]

Utilizaremos ACCOUNT_ID para identificar el account Id que utilizamos para autorizar la app.

### Registrar confianza en un usuario
```bash
near call CONTRACT_ACCOUNT_ID confiar '{"accountId": "juan.testnet", "comment":"todo perfecto", "relatedTx":"6ZSbdHZFkKGxnrYiY9fyym2uShbJYSLmzPSizJfX5Eee"}' --account-id ACCOUNT_ID
```

### Registrar desconfianza en un usuario
```bash
near call CONTRACT_ACCOUNT_ID descofiar '{"accountId": "juan.testnet", "comment":"vendedor poco confiable", "relatedTx":"6ZSbdHZFkKGxnrYiY9fyym2uShbJYSLmzPSizJfX5Eee"}' --account-id ACCOUNT_ID
```

### Obtener nivel de confianza de un usuario
```bash
near view CONTRACT_ACCOUNT_ID getConfianza '{"accountId": "juan.testnet"}'
```

### Obtener confiantes de un usuario
```bash
near call CONTRACT_ACCOUNT_ID getConfiantes '{"accountId":"juan.testnet"}' --accountId ACCOUNT_ID
```

### Obtener confidentes de un usuario
```bash
near call CONTRACT_ACCOUNT_ID getConfidentes '{"accountId":"juan.testnet"}' --accountId ACCOUNT_ID
```

### Obtener mis confiantes
```bash
near call CONTRACT_ACCOUNT_ID getMisConfiantes '{}' --accountId ACCOUNT_ID
```

### Obtener mis confidentes
```bash
near call CONTRACT_ACCOUNT_ID getMisConfidentes '{}' --accountId ACCOUNT_ID
```


# UI mockups de Trust-me
Para este proyecto pensamos en una UI sencilla, la cual tendría una mayor funcionalidad al momento de realizar conexiones con Amazon, Ebay, Mercado libre y más. Las acciones que podemos realizar en esta UI son:
   * _consultar el nivel de confianza_ de un miembro en la comunidad antes de realizar una transacción.
   * Ver a los mejores vendedores por plataforma.
   * Crear una cuenta usando tu cuenta de mainet.
   * Iniciar sesión usando tu cuenta de mainet y tu contraseña.
   * Ver el perfíl de los vendedores/compradores donde podremos ver:
       * Cuanta gente confía o desconfía en el/ella.
       * Su cantidad de ventas/compras.
       * Los comentarios de otros usuarios sobre esta persona.
       * Poder evaluar a este usuarios.
   * Buscar a los usuarios por su id de mainet.
   * Evaluar a los demás usuarios, usando su id, el número de transacción de venta/compra, evaluarlo como vendedor/comprador y comentarios sobre el usuario.
<br />
Estos diseños se pueden encontrar y navegar por ellos aquí: https://marvelapp.com/prototype/7541b96/screen/81825604









