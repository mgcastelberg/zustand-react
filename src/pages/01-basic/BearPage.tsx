import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <BlackBears/>
        <PolarBears/>
        <PandaBears/>
      </div>
    </>
  );
};

export const BlackBears = () => {
  const blackBears = useBearStore( state => state.blackBears );
  const increaseBlackBears = useBearStore( state => state.increaseBlackBears );
  // No es conveniente usar este tipo de desestructuracion ya que rerenderiza con cualquier cambio de otro componente
  // const { blackBears, increaseBlackBears} = useBearStore( state => state);
  return (
    <WhiteCard centered>
    <h2>Osos Negros</h2>
    <div className="flex flex-col md:flex-row">
      <button onClick={ () => increaseBlackBears(+1) }> +1</button>
      <span className="mx-2 text-3xl lg:mx-10"> { blackBears } </span>
      <button onClick={ () => increaseBlackBears(-1) }>-1</button>
    </div>
  </WhiteCard>
  )
}

export const PolarBears = () => {
  const polarBears = useBearStore( state => state.polarBears );
  const increasePolarBears = useBearStore( state => state.increasePolarBears );
  return (
    <WhiteCard centered>
    <h2>Osos Negros</h2>
    <div className="flex flex-col md:flex-row">
      <button onClick={ () => increasePolarBears(+1) }> +1</button>
      <span className="mx-2 text-3xl lg:mx-10"> { polarBears } </span>
      <button onClick={ () => increasePolarBears(-1) }>-1</button>
    </div>
  </WhiteCard>
  )
}

export const PandaBears = () => {
  const pandaBears = useBearStore( state => state.pandaBears );
  const increasePandaBears = useBearStore( state => state.increasePandaBears );
  return (
    <WhiteCard centered>
    <h2>Osos Negros</h2>
    <div className="flex flex-col md:flex-row">
      <button onClick={ () => increasePandaBears(+1) }> +1</button>
      <span className="mx-2 text-3xl lg:mx-10"> { pandaBears } </span>
      <button onClick={ () => increasePandaBears(-1) }>-1</button>
    </div>
  </WhiteCard>
  )
}
