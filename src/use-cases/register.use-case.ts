import { hash } from 'bcryptjs'
import { IUsersRepository } from '@/repositories/users-repository.interface'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.model'

interface IRegisterUseCase {
	name: string
	email: string
	password: string
}

export class RegisterUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({ name, email, password }: IRegisterUseCase) {
		const passwordHash = await hash(password, 6)
		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError()
		}

		await this.usersRepository.create({
			name,
			email,
			password_hash: passwordHash,
		})
	}
}
