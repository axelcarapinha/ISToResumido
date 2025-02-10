from query_data import query_rag
from langchain_community.llms.ollama import Ollama

EVAL_PROMPT = """
Expected Response: {expected_response}
Actual Response: {actual_response}
---
(Answer with 'true' or 'false') Does the actual response match the expected response? 
"""

def test_tecnicos_day(): 
    assert query_and_validate(
        question="Quando é o dia do Técnico?",
        expected_response="23 de maio de 2025",
    )


def test_student_associations():
    assert query_and_validate(
        question="Quais são os diferentes núcleos de cursos que existem no Técnico?",
        expected_response='''
        Fórum Civil - Associação de Estudantes de Engenharia Civil
        Fórum Mecânica - Núcleo de Estudantes de Engenharia Mecânica
        Núcleo de Alunos de Engenharia Naval (NAEN)
        Núcleo de Estudantes de Arquitetura (NucleAR)
        Núcleo de Estudantes de Engenharia Aeroespacial (AeroTéc)
        Núcleo de Estudantes de Engenharia do Ambiente (NEEA)
        Núcleo de Estudantes de Engenharia Biológica (NEB)
        Núcleo de Estudantes de Engenharia Biomédica (NEBM)
        Núcleo de Estudantes de Engenharia Eletrónica (N3E)
        Núcleo de Estudantes de Engenharia Eletrotécnica e de
        Computadores (NEEC)
        Núcleo de Estudantes de Engenharia e Gestão Industrial (NEEGI)
        Núcleo Estudantil de Informática (NEIIST)
        Núcleo de Estudantes de Materiais (NEMat)
        Núcleo de Engenharia Química (NEQIST)
        Núcleo de Estudantes de Eng.ª de Telecomunicações e Informática
        (NEETI)
        Núcleo de Estudantes de Matemática (NMath)
        Núcleo de Física (NFIST)
        Núcleo de Minas (NUMIST)
        ''',
    )


def query_and_validate(question: str, expected_response: str):
    response_text = query_rag(question)
    prompt = EVAL_PROMPT.format(
        expected_response=expected_response, actual_response=response_text
    )

    model = Ollama(model="tinyllama")
    evaluation_results_str = model.invoke(prompt)
    evaluation_results_str_cleaned = evaluation_results_str.strip().lower()

    print(prompt)

    if "true" in evaluation_results_str_cleaned:
        # Print response in Green if it is correct.
        print("\033[92m" + f"Response: {evaluation_results_str_cleaned}" + "\033[0m")
        return True
    elif "false" in evaluation_results_str_cleaned:
        # Print response in Red if it is incorrect.
        print("\033[91m" + f"Response: {evaluation_results_str_cleaned}" + "\033[0m")
        return False
    else:
        raise ValueError(
            f"Invalid evaluation result. Cannot determine if 'true' or 'false'."
        )

# All the tests to be run
test_tecnicos_day()
# test_student_associations()
