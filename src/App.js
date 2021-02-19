/* eslint-disable react/no-did-update-set-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/button-has-type */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import Downshift from "downshift";
import { ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./App.css";

const items = [
  {
    title: "Caged Bird",
    text: `A free bird leaps
on the back of the wind   
and floats downstream   
till the current ends
and dips his wing
in the orange sun rays
and dares to claim the sky. - Maya Angelou`
  },
  {
    title: "Lift Every Voice and Sing",
    text: `Lift every voice and sing   
Till earth and heaven ring,
Ring with the harmonies of Liberty;
Let our rejoicing rise
High as the listening skies,
Let it resound loud as the rolling sea.
Sing a song full of the faith that the dark past has taught us,
Sing a song full of the hope that the present has brought us.   
Facing the rising sun of our new day begun,
Let us march on till victory is won. - James Weldon Johnson`
  },
  {
    title: "Battle of the Rams",
    text: `The field has ceased to be lush wonder, from the eyes of a bird I watched them go again and again,
horns finding the softness behind fur. Here, what seek for death is been praised. Young boys jump
into the air to know the weightlessness of joy. Every year they come here to know death, to know
the last sound of a dying animal is a plea for the knife. I looked from above, sending back the spirit
of dead animals into the bodies of little boys. We were never too young to know the tongues of
kites are beginnings to rituals and when these boys begged to be set free from seeing a horn spill
blood on grasses, what do they mean? We all must know death to know the sadness of a grave. - Romeo Oriogun`
  },
  {
    title: "Girls Overheard While Assembling a Puzzle",
    text: `Are you sure this blue is the same as the
blue over there? This wall’s like the
bottom of a pool, its
color I mean. I need a
darker two-piece this summer, the kind with
elastic at the waist so it actually
fits. I can’t
find her hands. Where does this gold
go? It’s like the angel’s giving
her a little piece of honeycomb to eat.
I don’t see why God doesn’t
just come down and
kiss her himself. This is the red of that
lipstick we saw at the
mall. This piece of her
neck could fit into the light part
of the sky. I think this is a
piece of water. What kind of
queen? You mean
right here? And are we supposed to believe
she can suddenly
talk angel? Who thought this stuff
up? I wish I had a
velvet bikini. That flower’s the color of the
veins in my grandmother’s hands. I
wish we could
walk into that garden and pick an
X-ray to float on.
Yeah. I do too. I’d say a
zillion yeses to anyone for that. - Mary Szybist`
  },
  {
    title: "Bruh",
    text: `you can take my breath
but the bruh stays
lips slapping spice
of unknown bulk
face curry-blushed
from its blandness
my dad’s face caved
sour into his nose
when he heard it
the bruh cliff-hanging
on his beard
I think he tries to pray the white out of me
Town and Country now
a sermon bench for
290 west lectures
where D & D
is a cult following
if that’s the case
my dungeon master got me hypnotized
rolling d20s is life in a quick toss
my new friend group is wild
they got bruh in their structure
fingers type in the group chat
with the single syllable
smash
we duke it out in basements and
Ike’s aether always pops out our croaking throats
bruh
sometimes I want to falcon-punch life in the face
cause I can never find the rhythm
to lift my hand
place it on her waist
and hip the yuck out me
need to leave my house
can’t look at any direction without muttering
bruh
this word
should not be something I want
something that never leaves
the tongue of my brain
but I love the way it punches my chest
just wish it would punch me harder - Jesus Govea`
  }
];

class ControlledEditor extends React.Component {
  constructor(props) {
    super(props);

    const { text } = this.props;
    const content = ContentState.createFromText(text);

    this.state = {
      editorState: EditorState.createWithContent(content)
    };
  }

  componentDidUpdate(previousProps) {
    const { text } = this.props;
    const content = ContentState.createFromText(text);

    if (text !== previousProps.text) this.setState({ editorState: EditorState.createWithContent(content) });
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState
    });
  }

  render() {
    const { editorState } = this.state;
    return <Editor editorState={editorState} onEditorStateChange={this.onEditorStateChange.bind(this)} />;
  }
}

function App() {
  const [poem, setPoem] = React.useState(items[0]);

  return (
    <div>
      <Downshift
        onSelect={selection => {
          setPoem(selection);
        }}
        itemToString={item => (item ? item.title : "")}>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          getRootProps
        }) => (
          <div style={{ margin: "auto", textAlign: "center", width: "100%" }}>
            <label
              {...getLabelProps({
                style: { color: "white" }
              })}>
              {`Search for a poem: `}
            </label>
            <div style={{ display: "inline-block" }} {...getRootProps({}, { suppressRefError: true })}>
              <input {...getInputProps()} />
            </div>
            <ul {...getMenuProps()}>
              {isOpen
                ? items
                    .filter(item => !inputValue || item.title.toLowerCase().includes(inputValue.toLocaleLowerCase()))
                    .map((item, index) => (
                      <div
                        {...getItemProps({
                          key: item.title,
                          index,
                          item,
                          style: {
                            backgroundColor: highlightedIndex === index ? "lightgray" : "white",
                            fontWeight: selectedItem === item ? "bold" : "normal"
                          }
                        })}>
                        {item.title}
                      </div>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
      <div style={{ width: "50%", margin: "auto" }}>
        <ControlledEditor text={poem.text} />
      </div>
    </div>
  );
}

export default App;
