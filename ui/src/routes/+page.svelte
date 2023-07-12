
<script>
    import { onMount } from "svelte";

    import FaFileExport from 'svelte-icons/fa/FaFileExport.svelte'
    import FaRegTrashAlt from 'svelte-icons/fa/FaRegTrashAlt.svelte'
    let url = '';
    let error = '';
    let urls = [];

    onMount(async function () {
        const response = await fetch('http://127.0.0.1:5000/api/url');
        const data = await response.json();
        urls = data;
    });

    const handleDelete = async(id) => {
        const res = await fetch(`http://127.0.0.1:5000/api/url/${id}`,{
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            if (res.ok){
                urls = urls.filter(x => x.id !== id);
            }
    }

    const postUrl = async() => {
        if (validateUrl()){
            const res = await fetch('http://127.0.0.1:5000/api/url',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({url})
            })
            if (res.ok){
                const json = await res.json();
                urls = [...urls,json];
                url = '';
            }
        }
    }

    const validateUrl = () => {
        let valid = true;
        error = '';
        if (!url.startsWith('http://www.') && !url.startsWith('http://') && !url.startsWith('https://') 
        && !url.startsWith('www.')){
            valid = false;
            error = 'invalid url';
        }
    
        return valid;
    }

    const handleInput = (e) => {
        url = e.target.value;
    }
</script>

<div class="root">
    <h1 class="test">URL Shortener</h1>
    <p>Enter a URL below to receive a shortened link</p>

    <div class="formSection">
        <input type="text" on:input={handleInput} on:focus={() => error = ''} value={url} />
        <input type="button" on:click={postUrl} value="Go">
    </div>
    {#if error !== ''}
    <p>{error}</p>
{/if}

    <div class="tableSection">
        {#if urls.length > 0}
        <table>
            <thead>
                <tr>
                    <th>Long Url</th>
                    <th>Shortened Url</th>
                    <th>Date Added</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each urls as row}
                <tr>
                    <td>{row.long_url}</td>
                    <td>{row.short_url}</td>
                    <td>{row.date_added}</td>
                    <td class="icon" on:click={()=> window.open(`http://127.0.0.1:5000/${row.short_url}`)}><FaFileExport/></td>
                    <td class="icon" on:click={() => handleDelete(row.id)}><FaRegTrashAlt /></td>
                </tr>
              {/each}
            </tbody>
        </table>
        {:else}
  <p>No Urls have been shortened</p>
{/if}
    </div>
    
</div>
<style>
    .root{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 10%;
    }

    .formSection{
        display:flex
    }

    .tableSection{
        padding-top:5%
    }

    .icon {
    width: 16px;
    height: 16px;
  }

  .icon:hover{
    cursor: pointer;
  }
</style>