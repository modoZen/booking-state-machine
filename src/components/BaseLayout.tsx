import { useMachine } from "@xstate/react"
import { bookingMachine } from "../machines/bookingMachine"

const BaseLayout = () => {

    const [state, send] = useMachine(bookingMachine);

    console.log('nuestra máquina', state);

    return (
        <div>Hola mur</div>
    )
}

export { BaseLayout }