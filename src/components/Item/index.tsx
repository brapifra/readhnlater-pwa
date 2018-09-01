import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 10pt;
  color: #828282;
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
`;

const Title = styled.a`
    margin-right: 5px;
    &:hover{
      text-decoration: none !important;
    }
`;

const Domain = styled.span`
    font-size: 8pt;
`;

const AdditionalInfo = styled.div`
    line-height: 7pt;
    &>*{
      font-size: 7pt;
    }
    &>*:not(:last-child)::after{
      content: '|';
      margin: 0 2px;
    };
    & a {
      color: #828282;
    }
`;

export interface ItemProperties {
  id: number;
  deleted?: boolean;
  type?: "job" | "story" | "comment" | "poll" | "pollopt";
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
}

export default class Item extends React.Component<ItemProperties> {
  public render() {
    const { title, url, score, by, descendants } = this.props;
    return (
      <Container>
        <Title href={url}>{title}</Title>
        {url ?
          <Domain>(<a href={`http://${this.getUrlDomain(url)}`}>{this.getUrlDomain(url)}</a>)</Domain>
          : null
        }
        <AdditionalInfo>
          <span>{score} points by <a>{by}</a></span>
          <a>{descendants} comments</a>
        </AdditionalInfo>
      </Container>
    );
  }

  private getUrlDomain = (url: string) => (
    url ? url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split(/[/?#]/)[0]
      :
      null
  )
}