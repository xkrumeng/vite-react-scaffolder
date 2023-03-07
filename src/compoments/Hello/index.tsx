import { useState } from 'react';

import { initialComponentProps } from './handlers';
import { Hello } from './Hello';

export default (): JSX.Element => {
  const [componentProps] = useState(initialComponentProps); 
  return <Hello {...componentProps} />
}
