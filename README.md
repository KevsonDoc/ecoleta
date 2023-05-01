# Ecoleta

O ecoleta visa mapear locais de coleta de lixo na sua cidade e fazer o controle do que é descartado dentro de sua residência

# Sobre a nossa s.o.l.i.d e arquitetura hexagonal no back-end

Eu tentei implementar uma arquitetura de módulos usando princípios do S.O.L.I.D.
e arquiterua hexagonal.
Essa é a primeira vez em projetos pŕoprios que uso esses tipo de abordagens e não fiquei muito satisfeito com o resultado que consegui (pelo menos nos módulos de server e routes). Por enquanto acho isso o suficiente pelo menos para uma primeira vez. Melhor pronto para refatorar do que numca feito principalmente por se tratar de algo que estou colocando em prática por agora.

Apesar de entender bem os conceitos do solid e da arquitetura hexagonal na teoria, eu costumo usar o bom e rápido MVC como arquitetura por entender que (NA MINHA OPINIÃO) a arquitetura hexagonal e solid deve ser usado em projetos bem mais complexos (já que mvc é mais rápido de ser implementado). Isso óbviamente não me impede de usar hexagonal e solid em uma plicação REST com 5 endpoints.

## Meu ponto de vista sobre S.O.L.I.D e Arquitetura Hexagonal

Eu realmente estou impressionado com o s.o.l.i.d. na prática me lembra muito das aulas de programação orientada a objeto no técnico. Eu amava (apesar de ter extrema dificuldade em entender) transformar desde uma cadeira até a escola em um objeto com classes, sempre podendo quebrar em mais objetos e extendenlos em classes.

...continua

Isso era pra ser algo rápido mas queria expor minha visão e o quão animado estou em usar hexagonal e s.o.l.i.d mas vejo que vou ter que fazer um blog (risos)

## Adapter

Inclui todos os adaptadores desde ORM a validação de dados

## port

Onde há todos os contrados onde liga as portas aos user cases/services
