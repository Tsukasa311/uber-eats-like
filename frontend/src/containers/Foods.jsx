import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { LocalMallIcon } from '../components/Icons';

//reducers
import {
  initialState as foodInitialState,
  foodsActionTypes,
  foodReducer,
  foodsReducer,
} from '../reducers/foods';

// apis
import { fetchFoods } from '../apis/foods';

//constants
import { COLORS } from '../style_constants';
import { REQUEST_STATE } from '../constants';

//images
import MainLogo from '../images/logo.png';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

export const Foods = ({
  match
  }) => {
    const [foodState, dispatch] = useReducer(foodsReducer, foodInitialState);
    useEffect(() => {
      dispatch({ type: foodsActionTypes.FETCHING });
      fetchFoods(match.params.restaurantsId)
      .then((data) => {
        dispatch({
          type: foodsActionTypes.FETCH_SUCCESS,
          payload: {
            foods: data.foods
          }
        });
      })
    },[])

  return (
    <Fragment>
      {
        foodState.fetchState === REQUEST_STATE.LOADING?
        <Fragment>
          <p>
            ロード中...
          </p>
        </Fragment>
        :
        <HeaderWrapper>
          <MainLogoImage src={MainLogo} alt="main logo" />
          <BagIconWrapper>
            <ColoredBagIcon>
            </ColoredBagIcon>
          </BagIconWrapper>
        </HeaderWrapper>
      }
    </Fragment>
  )
}