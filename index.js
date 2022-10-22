const redux = require("redux")
const { createStore, combineReducers } = redux

const criarContrato = (nome, taxa) => {
    return {
        type: "CRIAR_CONTRATO",
        payload: {
            nome,
            taxa
        }
    }
}

const cancelarContrato = (nome) => {
    return {
        type: "CANCELAR_CONTRATO",
        payload: {
            nome
        }
    }
}

const solicitarCashback = (nome, valor) => {
    return {
        type: "CASHBACK",
        payload: {
            nome,
            valor
        }
    }
}

const historicoDePedidosDeCashback = (historicoDePedidosDeCashbackAtual = [], acao) => {
    if (acao.type === "CASHBACK") {
        return [...historicoDePedidosDeCashbackAtual, acao.payload]
    }
    return historicoDePedidosDeCashbackAtual
}

const caixa = (dinheiroEmCaixa = 0, acao) => {
    if (acao.type === "CRIAR_CONTRATO") {
        return dinheiroEmCaixa + acao.payload.taxa
    }
    else if (acao.type === "CASHBACK") {
        return dinheiroEmCaixa - acao.payload.valor
    }
    return dinheiroEmCaixa
}

const contratos = (contratosAtuais = [], acao) => {
    if (acao.type === "CRIAR_CONTRATO") {
        return [...contratosAtuais, acao.payload]
    }
    else if (acao.type === "CANCELAR_CONTRATO") {
        return contratosAtuais.filter(contrato => contrato.nome !== acao.payload.nome)
    }
    return contratosAtuais
}

const todosOsReducers = combineReducers({
    contratos,
    caixa,
    historicoDePedidosDeCashback
})

const store = createStore(todosOsReducers)

store.dispatch(criarContrato("Jose", 100))
console.log("Contrato de Jose criado. Contratos atuais: ", store.getState().contratos)
store.dispatch(criarContrato("Maria", 200))
console.log("Contrato de Maria criado. Contratos atuais: ", store.getState().contratos)

store.dispatch(solicitarCashback("Maria", 10))
console.log("Cashback de Maria solicitado. Caixa: ", store.getState().caixa)
store.dispatch(solicitarCashback("Jose", 20))
console.log("Cashback de Jose solicitado. Caixa: ", store.getState().caixa)

store.dispatch(cancelarContrato("Maria"))
console.log("Contrato de Jose cancelado. Contratos atuais: ", store.getState().contratos)