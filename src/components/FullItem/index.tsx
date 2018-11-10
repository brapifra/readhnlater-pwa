import * as React from 'react';
import styled from 'styled-components';
import ItemHeader, { ItemProperties } from "../ItemHeader";
import Comment from '../Comment';
import { match as Match } from 'react-router';
import { OrderedMap } from 'immutable';
import ItemFetcher from '../ItemFetcher';

const Container = styled.div`
  padding: 15px;
`;

const Description = styled.div`
  margin: 10px 0;
  font-size: 10pt;
  color: #828282;
`;

const Comments = styled.div`
  margin-top: 30px;
  & > * {
    margin-bottom: 20px;
  }
`;

interface Props {
  match: Match<{ id: string }>;
  items: OrderedMap<string, ItemProperties>;
  addItem: (s: ItemProperties) => void;
}

export default class FullItem extends React.Component<Props> {
  public render() {
    const renderComment = (item: ItemProperties) => (
      <Comment {...item} />
    );

    const renderItem = (item: ItemProperties) => (
      <Container>
        {item.type && item.type === 'comment' ?
          <Comment {...item} />
          :
          <React.Fragment>
            <ItemHeader {...item} />
            <Description dangerouslySetInnerHTML={{ __html: (item).text || '' }} />
            <Comments>
              {(item.kids || []).map((kidId, index) => (
                <ItemFetcher id={kidId.toString()} render={renderComment} key={index} />
              ))}
            </Comments>
          </React.Fragment>
        }
      </Container>
    );

    return (
      <ItemFetcher id={this.props.match.params.id} render={renderItem} />
    );
  }
}