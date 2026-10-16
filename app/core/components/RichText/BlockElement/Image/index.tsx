import * as S from './styles';
import * as t from '../../types';

interface BlockImageProps {
  data?: t.BlockElement;
}

export const Image = ({ data }: BlockImageProps) => <S.Img src={data?.url} alt={data?.url} />;
