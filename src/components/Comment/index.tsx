import * as React from 'react';
import * as moment from 'moment';
import { FaComment } from 'react-icons/fa';
import styled from 'styled-components';
import { ItemProperties } from '../ItemHeader';
import ItemFetcher from '../ItemFetcher';

const Container = styled.div`
  margin: 30px 0;
  font-size: 10pt;
  margin-left: ${({ level }: { level: number }) => `${level * 20}px`};
  
  & a {
    :visited {
      color: #828282;
    }
    :hover{
      text-decoration: underline;
    }
    text-decoration: none;
    outline: none;
    color: black;
  }
  @media only screen and (min-width : 300px) and (max-width : 750px) {
    font-size: 11pt;
  }
`;

const Title = styled.div`
    color: #828282;
    display: flex;
    align-items: center;

    & > * {
      margin-right: 5px;
    }
`;

const Text = styled.div`
    margin: 10px 0 0 20px;
`;

const Collapse = styled.span`
    cursor: pointer;

    :hover{
      text-decoration: underline;
    }
`;

interface Props {
  level?: number;
}

interface State {
  collapsed: boolean;
}

export default class Comment extends React.PureComponent<ItemProperties & Props, State> {
  public state: State = {
    collapsed: false
  }

  public render() {
    const { by, time, text, level, kids } = this.props;
    const { collapsed } = this.state;

    const renderComment = (item: ItemProperties) => (
      <Comment {...item} level={(level || 0) + 1} />
    );

    if (!text) {
      return null;
    }

    return (
      <Container level={level || 0} >
        <Title>
          <FaComment size={13} style={{ marginTop: 1 }} />
          <span>{by}</span>
          {time ? <span>{moment.unix(time).fromNow()}</span> : null}
          <Collapse onClick={collapsed ? this.open : this.close}>
            [{collapsed ? `+${(kids || []).length || ''}` : '-'}]
          </Collapse>
        </Title>
        {!collapsed ?
          <div>
            <Text dangerouslySetInnerHTML={{ __html: text }} />
            {(kids || []).map((kidId, index) => (
              <ItemFetcher id={kidId.toString()} render={renderComment} key={index} />
            ))}
          </div> :
          null
        }
      </Container>
    );
  }


  private close = () => this.setState({ collapsed: true });

  private open = () => this.setState({ collapsed: false });
}
