# Padroização da comunicação entre frontend e backend

**Por enquanto não tem login, quem entrar na aplicação pode aditar, excluir e adicionar qualquer usuario**

## Sumario

- [GET /user/:id](#get-users)
- [POST /user](#get-userid)
- [GET /knowledges](#post-user)
- [PUT /user/:id](#get-knowledges)
- [PUT /user/:id/knowledge](#put-useridknowledge)
- [Filtro por conhecimento](#filtro-por-conhecimento)
- [Funcionalidade das telas](#telas)

## GET /users

[Voltar para o sumario](#sumario)

- existem atributos opcionais.
- campos obrigatórios: name, email, level.

RESPONSE:

```js
{
	users: [
	{
		name:'',
		email:'',
		description:'',
		contact:'Telegram: telegram.com/blabla',
		level:'Pleno',
		knowledge: [
			{ name: 'nodejs', score: 5 },
			{ name: 'reactjs', score: 4 },
			{ name: 'backend', score: 3 },
			{ name: 'sql', score: 2 },
			{ name: 'mysql', score: 1 }
		]
	},{
		name:'',
		email:'',
		description:'',
		contact:'',
		level:''
	},{
		name:'',
		email:'',
		description:'',
		level:''
	},{
		name:'',
		email:'',
		level:''
	}
	]
}
```

BACKEND:

- select com joins.

## GET /user/:id

[Voltar para o sumario](#sumario)

- ver as infos de um usuario.

RESPONSE:

```js
{
	user: {
		name:'',
		email:'',
		description:'',
		contact:'',
		level:'',
		knowledge: [
			{ name: 'nodejs', score: 5 },
			{ name: 'reactjs', score: 4 },
			{ name: 'backend', score: 3 },
			{ name: 'sql', score: 2 },
			{ name: 'mysql', score: 1 }
		]
	}
}
```

BACKEND:

- select com id e com joins.

## POST /user

[Voltar para o sumario](#sumario)

- cadastro de usuario com conhecimento e nivel de conhecimento

REQUEST:

```js
{
	user: {
		name:'',
		email:'',
		password:'',
		description:'',
		contact:'',
		level:'',//
		knowledge: [
			{ name: 'nodejs', score: 5 },
			{ name: 'reactjs', score: 4 },
			{ name: 'backend', score: 3 },
			{ name: 'sql', score: 2 },
			{ name: 'mysql', score: 1 }
		]
	}
}
```

BACKEND:

- select com joins
- colocar o knowledge pra maiusculo
- quebrar o knowledge e vai inserindo cada um no banco (caso não exista)
- verificar se o email é unico no banco
- verificar se os campos obrigatorios estao preenchidos (user e knowledge)

## GET /knowledges

[Voltar para o sumario](#sumario)

- get de todos os knowledge. quando for escrever um knowledge, tem um autocomplete.

RESPONSE:

```js
{
	knowledges: ['nodejs','reactjs','backend','sql','mysql']
}
```

BACKEND:

- select name from knowledges

## PUT /user/:id

[Voltar para o sumario](#sumario)

- botao: "atualizar dados do usuario", "atualizar conhecimentos do usuario". quando aperta um desses botões, só vai enviar as informacoes pro backend só do que o botão está relacionado. no caso dos dados do usuario, não vai enviar os conhecimentos do usuário.

REQUEST:

```js
{
	user: {
		name:'',
		email:'',
		password:'',
		description:'',
		contact:'',
		level:'',
	}
}
```

BACKEND:

- verificar se email já existe e que não seja do proprio usuario.
- verificar se os campos obrigatórios não estão vazios

## PUT /user/:id/knowledge

[Voltar para o sumario](#sumario)

```js
{
	user: {
		id: '',
		knowledge: [
			{ name: 'nodejs', score: 5 },
			{ name: 'reactjs', score: 4 },
			{ name: 'backend', score: 3 },
			{ name: 'sql', score: 2 },
			{ name: 'mysql', score: 1 }
		]
	}
}

{
	user: {
		id: '',
		knowledge: [
			{ name: 'php', score: 5 }
		]
	}
}

{
	user: {
		id: '',
		knowledge: [
			{ name: 'nodejs', score: 5 },
			{ name: 'mysql', score: 3 }
		]
	}
}
```

BACKEND:

- verificar se já existe no banco o nome, se existir então nao cadastra.
- verificar se o usuario já tem conhecimento.
- atualizar o score.

## Filtro por conhecimento

[Voltar para o sumario](#sumario)

- faça a requisição por todos os usuarios e guarde no state do react;
- conforme a pessoa escreve na barra de procura, deve buscar os usuarios que tem aquele conhecimento (atributo knowledge)

## Telas

1. Home
	- mostra todos os usuarios ([descrito aqui](#get-users));
	- tem barra de filtro por conhecimento, conforme a pessoa escreve o conhecimento, busca e mostra só os usuarios que tem esse conhecimento ([descrito aqui](#filtro-por-conhecimento));
2. Cadastro
	- mostra os campos de cadastro ([descrito aqui](#post-user))
3. Usuario
	- mostra os campos do usuario cadastrado e da a opcao de editar ([descrito aqui](#put-userid))





filtro vai ser diferente, manda o que a pessoa escreveu pro backend

