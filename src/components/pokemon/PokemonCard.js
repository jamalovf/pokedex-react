import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Sprite = styled.img `
    width: 5em;
    height: 5em;
`;

const Card = styled.div `
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8m .25, 1);
    &:hover {
        box-shadow: 0 15px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
    -moz-user-select: none;
    -website-user-select: none;
    user-select: none;
    -o-user-select: none;
`

const StyledLink = styled(Link) `

    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }

`

export default class PokemonCard extends Component {

    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: ''
    };

    componentDidMount() {
        const { name, url} = this.props;
        const pokemonIndex = url.split("/")[url.split("/").length - 2];
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
   
        this.setState({
            name: name,
            imageUrl: imageUrl,
            pokemonIndex: pokemonIndex,
            imageLoading: true,
            tooManyRequests: false
        })
    }

    render() {

        return (
            <div className="col-md-3 col-sm-6 mb-5">
                <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
                    <Card className="card">
                        <h5 className="card-header">#{this.state.pokemonIndex}</h5>
                        <Sprite className="card-img-top rounded mx-auto mt-2"
                                onLoad={() => this.setState({imageLoading: false})}
                                onError={() => this.setState({tooManyRequests: true})}
                                src={this.state.imageUrl}    
                        />
                        <div className="card-body mx-auto">
                            <h6 className="card-title">
                                {
                                this.state.name
                                .toLowerCase()
                                .split(" ")
                                .map(
                                    letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                                )
                                .join('')
                                }
                            </h6>
                        </div>
                    </Card>
                </StyledLink>
            </div>
        )
    }
}
