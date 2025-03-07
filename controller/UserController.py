import json

from flask import Blueprint, jsonify, request, Response, render_template_string
from services.UserService import UserService

user_controller = Blueprint('user', __name__)

user_service = UserService()

@user_controller.route("/users", methods=["GET"])
def get_all_users():
    users = user_service.get_all_users()
    user_list = []
    for user in users:
        user_dict = {
            'login': user.login,
            'password': user.senha,
            'cpf': user.cpf,
            'saldo': user.saldo,
            'PUBLIC_KEY': user.public_key,
            'PRIVATE_KEY': user.private_key
        }
        user_list.append(user_dict)
    return jsonify(user_list), 200

#Logar Usuário -> Login e senha
@user_controller.route("/users", methods=["POST"])
def post_user():
    request_data = request.get_json()

    if 'login' not in request_data or 'password' not in request_data:
        return jsonify({'message': 'Campos inválidos, verifique e tente novamente'}), 400

    login = request_data['login']
    password = request_data['password']

    user = user_service.get_user_login(login)


    if user is None:
        return jsonify({'message': 'Usuário não existe'}), 404

    if user.senha == password:
        user_json = json.dumps(user.to_json())
        return jsonify(user_json), 200
    else:
        return jsonify({'message': 'Senha incorreta'}), 404

#Criar usuário -> Login, Senha e cpf e saldo
@user_controller.route("/registerUser", methods=["POST"])
def regist_user():
    request_data = request.get_json()

    # Verifique os campos obrigatórios
    if 'login' not in request_data or 'password' not in request_data or 'cpf' not in request_data or 'saldo' not in request_data:
        return jsonify({'message': 'Campos inválidos, verifique e tente novamente'}), 400

    login = request_data['login']
    password = request_data['password']
    saldo = request_data['saldo']
    cpf = request_data['cpf']

    user_service.create_user(login,password,cpf,saldo)
    return jsonify({'message': 'Cadastrado'}), 201

