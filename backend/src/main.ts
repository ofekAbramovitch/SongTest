import { NestFactory } from '@nestjs/core'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { config } from 'dotenv'
import { AppModule } from './app.module'

config()

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const corsOptions: CorsOptions = {
		origin: ['http://localhost:3000', 'http://192.168.137.1:3000'],
		credentials: true,
	}
	app.enableCors(corsOptions)

	await app.listen(process.env.PORT || 3030)
}
bootstrap()
