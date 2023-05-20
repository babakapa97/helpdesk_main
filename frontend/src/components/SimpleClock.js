import { useClock } from 'react-use-clock'

const SimpleClock = () => {
	const clock = useClock()

	return (
		<div>
			Текущее время:{' '}
			<strong className>
				{clock.hours.toString().padStart(2, '0')}:
				{clock.minutes.toString().padStart(2, '0')}:
				{clock.seconds.toString().padStart(2, '0')}
			</strong>
			<div
				style={{
					'--hours': `${clock.hours}`,
					'--minutes': `${clock.minutes}`,
					'--seconds': `${clock.seconds}`,
				}}
			/>
		</div>
	)
}

export default SimpleClock;