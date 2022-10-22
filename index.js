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